export const getFormattedInvoiceId = (invoiceId: number, prefix = "INV") => {
  return `${prefix}-${(invoiceId && invoiceId.toString().padStart(5, "0")) || ""}`;
};
