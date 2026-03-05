"use client";

import type { ComponentPropsWithRef, HTMLAttributes, ReactNode, Ref, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { createContext, isValidElement, useContext, useState } from "react";
import { ArrowDown, ChevronSelectorVertical, Copy01, Edit01, HelpCircle, Trash01 } from "@untitledui/icons";
import type {
    CellProps as AriaCellProps,
    ColumnProps as AriaColumnProps,
    RowProps as AriaRowProps,
    TableHeaderProps as AriaTableHeaderProps,
    TableProps as AriaTableProps,
} from "react-aria-components";
import {
    Cell as AriaCell,
    Collection as AriaCollection,
    Column as AriaColumn,
    Group as AriaGroup,
    Row as AriaRow,
    Table as AriaTable,
    TableBody as AriaTableBody,
    TableHeader as AriaTableHeader,
    useTableOptions,
} from "react-aria-components";
import { Badge } from "@/components/base/badges/badges";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { cx } from "@/lib/utils/cx";
import { Button } from "@/components/ui/button";
import { deleteUserSubscription } from "@/services/subscriptions";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Eye } from "lucide-react";
import Link from "next/link";

const DeleteConfirmModal = ({
    open,
    onClose,
    onConfirm,
    loading,
}: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}) => {
    if (!open) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", backgroundColor: "rgba(0,0,0,0.55)" }}
            onClick={(e) => { if (e.target === e.currentTarget && !loading) onClose(); }}
        >
            <div
                className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
                style={{
                    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
                    animation: "modalIn 0.22s cubic-bezier(0.34,1.56,0.64,1) both",
                }}
            >
                {/* Glow accent */}
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/60 to-transparent" />
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full blur-3xl" style={{ background: "rgba(239,68,68,0.12)" }} />

                <div className="relative px-8 pt-8 pb-7 flex flex-col items-center text-center gap-5">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-16 h-16 rounded-full border border-red-500/20" style={{ background: "rgba(239,68,68,0.1)" }}>
                        <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>

                    {/* Text */}
                    <div className="space-y-1.5">
                        <h2 className="text-xl font-semibold text-white tracking-tight">Delete subscription?</h2>
                        <p className="text-sm text-white/45 leading-relaxed max-w-xs">
                            This action is permanent and cannot be undone. The subscription will be removed from your account immediately.
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-white/5" />

                    {/* Actions */}
                    <div className="flex w-full gap-3">
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white/70 border border-white/10 transition-all duration-200 hover:bg-white/5 hover:text-white hover:border-white/20 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white border border-red-500/30 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                            style={{ background: loading ? "rgba(239,68,68,0.4)" : "linear-gradient(135deg,#ef4444,#dc2626)", boxShadow: loading ? "none" : "0 4px 20px rgba(239,68,68,0.35)" }}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Deleting…
                                </>
                            ) : (
                                "Delete"
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes modalIn {
                    from { opacity: 0; transform: scale(0.88) translateY(12px); }
                    to   { opacity: 1; transform: scale(1)   translateY(0);    }
                }
            `}</style>
        </div>
    );
};

export const TableRowActionsDropdown = ({ isExpired, cancelUrl, subId }: { isExpired: boolean, cancelUrl: string, subId: string }) => {
    const queryClient = useQueryClient();
    const [showModal, setShowModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            const res = await deleteUserSubscription(subId);
            if (res) {
                toast.success("Subscription deleted successfully");
                await queryClient.invalidateQueries({ queryKey: ['subscriptions-data'] });
                setShowModal(false);
            } else {
                toast.error("Failed to delete subscription");
            }
        } catch {
            toast.error("Failed to delete subscription");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            <DeleteConfirmModal
                open={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
                loading={deleting}
            />
            <Dropdown.Root>
                <Dropdown.DotsButton />
                <Dropdown.Popover className="w-min">
                    <Dropdown.Menu>
                        {isExpired ? (
                            <Dropdown.Item icon={Edit01}>
                                <span className="pr-4">Renew</span>
                            </Dropdown.Item>
                        ) : (
                            <Dropdown.Item icon={Trash01}>
                                <a href={`${cancelUrl}`} target="_blank" className="pr-4">Cancel</a>
                            </Dropdown.Item>
                        )}
                        <Dropdown.Item icon={Trash01}>
                            <button onClick={() => setShowModal(true)} className="pr-4 text-red-400 hover:text-red-300 transition-colors">
                                Delete
                            </button>
                        </Dropdown.Item>
                        <Dropdown.Item icon={Eye}>
                            <Link href={`/dashboard/subscriptions/${subId}`} className="pr-4 text-white/70 hover:text-white transition-colors">
                                Details
                            </Link>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown.Root>
        </>
    );
};

const TableContext = createContext<{ size: "sm" | "md" }>({ size: "md" });

const TableCardRoot = ({ children, className, size = "md", ...props }: HTMLAttributes<HTMLDivElement> & { size?: "sm" | "md" }) => {
    return (
        <TableContext.Provider value={{ size }}>
            <div {...props} className={cx("overflow-hidden rounded-xl bg-primary shadow-xs ring-1 ring-secondary", className)}>
                {children}
            </div>
        </TableContext.Provider>
    );
};

interface TableCardHeaderProps {
    /** The title of the table card header. */
    title: string;
    /** The badge displayed next to the title. */
    badge?: ReactNode;
    /** The description of the table card header. */
    description?: string;
    /** The content displayed after the title and badge. */
    contentTrailing?: ReactNode;
    /** The class name of the table card header. */
    className?: string;
}

const TableCardHeader = ({ title, badge, description, contentTrailing, className }: TableCardHeaderProps) => {
    const { size } = useContext(TableContext);

    return (
        <div
            className={cx(
                "relative flex flex-col items-start gap-4 border-b border-white/10 bg-white/5 px-4 md:flex-row",
                size === "sm" ? "py-4 md:px-5" : "py-5 md:px-6",
                className,
            )}
        >
            <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                    <h2 className={cx("font-semibold text-primary", size === "sm" ? "text-md" : "text-lg")}>{title}</h2>
                    {badge ? (
                        isValidElement(badge) ? (
                            badge
                        ) : (
                            <Badge color="brand" size="sm">
                                {badge}
                            </Badge>
                        )
                    ) : null}
                </div>
                {description && <p className="text-sm text-tertiary">{description}</p>}
            </div>
            {contentTrailing}
        </div>
    );
};

interface TableRootProps extends AriaTableProps, Omit<ComponentPropsWithRef<"table">, "className" | "slot" | "style"> {
    size?: "sm" | "md";
}

const TableRoot = ({ className, size = "md", ...props }: TableRootProps) => {
    const context = useContext(TableContext);

    return (
        <TableContext.Provider value={{ size: context?.size ?? size }}>
            <div className="overflow-x-auto">
                <AriaTable className={(state) => cx("w-full overflow-x-hidden", typeof className === "function" ? className(state) : className)} {...props} />
            </div>
        </TableContext.Provider>
    );
};
TableRoot.displayName = "Table";

interface TableHeaderProps<T extends object>
    extends AriaTableHeaderProps<T>,
    Omit<ComponentPropsWithRef<"thead">, "children" | "className" | "slot" | "style"> {
    bordered?: boolean;
}

const TableHeader = <T extends object>({ columns, children, bordered = true, className, ...props }: TableHeaderProps<T>) => {
    const { size } = useContext(TableContext);
    const { selectionBehavior, selectionMode } = useTableOptions();

    return (
        <AriaTableHeader
            {...props}
            className={(state) =>
                cx(
                    "relative bg-white/5",
                    size === "sm" ? "h-9" : "h-11",

                    // Row border—using an "after" pseudo-element to avoid the border taking up space.
                    bordered &&
                    "[&>tr>th]:after:pointer-events-none [&>tr>th]:after:absolute [&>tr>th]:after:inset-x-0 [&>tr>th]:after:bottom-0 [&>tr>th]:after:h-px [&>tr>th]:after:bg-white/10 [&>tr>th]:focus-visible:after:bg-transparent",

                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {selectionBehavior === "toggle" && (
                <AriaColumn className={cx("relative py-2 pr-0 pl-4", size === "sm" ? "w-9 md:pl-5" : "w-11 md:pl-6")}>
                    {selectionMode === "multiple" && (
                        <div className="flex items-start">
                            <Checkbox slot="selection" size={size} />
                        </div>
                    )}
                </AriaColumn>
            )}
            <AriaCollection items={columns}>{children}</AriaCollection>
        </AriaTableHeader>
    );
};

TableHeader.displayName = "TableHeader";

interface TableHeadProps extends AriaColumnProps, Omit<ThHTMLAttributes<HTMLTableCellElement>, "children" | "className" | "style" | "id"> {
    label?: string;
    tooltip?: string;
}

const TableHead = ({ className, tooltip, label, children, ...props }: TableHeadProps) => {
    const { selectionBehavior } = useTableOptions();

    return (
        <AriaColumn
            {...props}
            className={(state) =>
                cx(
                    "relative p-0 px-6 py-2 outline-hidden focus-visible:z-1 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-bg-primary focus-visible:ring-inset",
                    selectionBehavior === "toggle" && "nth-2:pl-3",
                    state.allowsSorting && "cursor-pointer",
                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {(state) => (
                <AriaGroup className="flex items-center gap-1">
                    <div className="flex items-center gap-1">
                        {label && <span className="text-xs font-semibold whitespace-nowrap text-quaternary">{label}</span>}
                        {typeof children === "function" ? children(state) : children}
                    </div>

                    {tooltip && (
                        <Tooltip title={tooltip} placement="top">
                            <TooltipTrigger className="cursor-pointer text-fg-quaternary transition duration-100 ease-linear hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover">
                                <HelpCircle className="size-4" />
                            </TooltipTrigger>
                        </Tooltip>
                    )}

                    {state.allowsSorting &&
                        (state.sortDirection ? (
                            <ArrowDown className={cx("size-3 stroke-[3px] text-fg-quaternary", state.sortDirection === "ascending" && "rotate-180")} />
                        ) : (
                            <ChevronSelectorVertical size={12} strokeWidth={3} className="text-fg-quaternary" />
                        ))}
                </AriaGroup>
            )}
        </AriaColumn>
    );
};
TableHead.displayName = "TableHead";

interface TableRowProps<T extends object>
    extends AriaRowProps<T>,
    Omit<ComponentPropsWithRef<"tr">, "children" | "className" | "onClick" | "slot" | "style" | "id"> {
    highlightSelectedRow?: boolean;
}

const TableRow = <T extends object>({ columns, children, className, highlightSelectedRow = true, ...props }: TableRowProps<T>) => {
    const { size } = useContext(TableContext);
    const { selectionBehavior } = useTableOptions();

    return (
        <AriaRow
            {...props}
            className={(state) =>
                cx(
                    "relative outline-focus-ring transition-colors after:pointer-events-none hover:bg-secondary focus-visible:outline-2 focus-visible:-outline-offset-2",
                    size === "sm" ? "h-14" : "h-18",
                    highlightSelectedRow && "selected:bg-secondary",

                    // Row border—using an "after" pseudo-element to avoid the border taking up space.
                    "[&>td]:after:absolute [&>td]:after:inset-x-0 [&>td]:after:bottom-0 [&>td]:after:h-px [&>td]:after:w-full [&>td]:after:bg-border-secondary last:[&>td]:after:hidden [&>td]:focus-visible:after:opacity-0 focus-visible:[&>td]:after:opacity-0",

                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {selectionBehavior === "toggle" && (
                <AriaCell className={cx("relative py-2 pr-0 pl-4", size === "sm" ? "md:pl-5" : "md:pl-6")}>
                    <div className="flex items-end">
                        <Checkbox slot="selection" size={size} />
                    </div>
                </AriaCell>
            )}
            <AriaCollection items={columns}>{children}</AriaCollection>
        </AriaRow>
    );
};

TableRow.displayName = "TableRow";

interface TableCellProps extends AriaCellProps, Omit<TdHTMLAttributes<HTMLTableCellElement>, "children" | "className" | "style" | "id"> {
    ref?: Ref<HTMLTableCellElement>;
}

const TableCell = ({ className, children, ...props }: TableCellProps) => {
    const { size } = useContext(TableContext);
    const { selectionBehavior } = useTableOptions();

    return (
        <AriaCell
            {...props}
            className={(state) =>
                cx(
                    "relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2",
                    size === "sm" && "px-5 py-3",
                    size === "md" && "px-6 py-4",

                    selectionBehavior === "toggle" && "nth-2:pl-3",

                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {children}
        </AriaCell>
    );
};
TableCell.displayName = "TableCell";

const TableCard = {
    Root: TableCardRoot,
    Header: TableCardHeader,
};

const Table = TableRoot as typeof TableRoot & {
    Body: typeof AriaTableBody;
    Cell: typeof TableCell;
    Head: typeof TableHead;
    Header: typeof TableHeader;
    Row: typeof TableRow;
};
Table.Body = AriaTableBody;
Table.Cell = TableCell;
Table.Head = TableHead;
Table.Header = TableHeader;
Table.Row = TableRow;

export { Table, TableCard };
