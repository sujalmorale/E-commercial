/* ==========================================================================
   AMAZON CLONE - PRINTABLE INVOICE GENERATOR
   ========================================================================== */

function generateInvoiceHTML(order) {
  const formattedDate = new Date(order.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return `
    <div class="invoice-container">
      <div class="invoice-header">
        <div>
          <h1 style="color:#131921; font-size:28px; margin-bottom:4px;">amazon<span style="color:#ff9900;">.com</span></h1>
          <p style="font-size:12px; color:#666;">Official Order Summary & Invoice</p>
        </div>
        <div style="text-align:right;">
          <h2 style="font-size:18px; color:#333;">INVOICE</h2>
          <p style="font-size:13px; font-weight:bold; color:#007185;">Order #: ${order.id}</p>
          <p style="font-size:12px; color:#555;">Order Date: ${formattedDate}</p>
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; margin-bottom:24px; font-size:13px;">
        <div style="width:48%;">
          <h4 style="font-size:14px; border-bottom:1px solid #ccc; padding-bottom:4px; margin-bottom:8px;">Shipping Address</h4>
          <p><strong>${order.shippingAddress.name || 'Customer'}</strong></p>
          <p>${order.shippingAddress.street}</p>
          <p>${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}</p>
        </div>
        <div style="width:48%;">
          <h4 style="font-size:14px; border-bottom:1px solid #ccc; padding-bottom:4px; margin-bottom:8px;">Payment Information</h4>
          <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
          <p><strong>Status:</strong> <span style="color:#067d62; font-weight:bold;">Paid / ${order.status}</span></p>
        </div>
      </div>

      <table class="invoice-table">
        <thead>
          <tr>
            <th>Item Details</th>
            <th style="text-align:center;">Qty</th>
            <th style="text-align:right;">Unit Price</th>
            <th style="text-align:right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${order.items.map(item => `
            <tr>
              <td>
                <strong>${item.title}</strong>
              </td>
              <td style="text-align:center;">${item.quantity}</td>
              <td style="text-align:right;">$${item.price.toFixed(2)}</td>
              <td style="text-align:right;">$${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div style="display:flex; justify-direction:column; align-items:flex-end; font-size:14px; margin-top:20px; gap:6px;">
        <p style="width:240px; display:flex; justify-content:space-between;"><span>Items Subtotal:</span> <span>$${order.subtotal.toFixed(2)}</span></p>
        ${order.discount > 0 ? `<p style="width:240px; display:flex; justify-content:space-between; color:#cc0c39;"><span>Discount:</span> <span>-$${order.discount.toFixed(2)}</span></p>` : ''}
        <p style="width:240px; display:flex; justify-content:space-between;"><span>Shipping & Handling:</span> <span>${order.shippingFee === 0 ? 'FREE' : '$' + order.shippingFee.toFixed(2)}</span></p>
        <p style="width:240px; display:flex; justify-content:space-between;"><span>Estimated Tax:</span> <span>$${order.tax.toFixed(2)}</span></p>
        <hr style="width:240px; border:none; border-top:2px solid #333; margin:4px 0;" />
        <p style="width:240px; display:flex; justify-content:space-between; font-size:16px; font-weight:bold;"><span>Grand Total:</span> <span style="color:#b12704;">$${order.grandTotal.toFixed(2)}</span></p>
      </div>

      <div style="margin-top:40px; border-top:1px solid #ddd; padding-top:16px; text-align:center; font-size:11px; color:#777;">
        <p>Thank you for shopping with Amazon!</p>
        <p>For questions or returns, visit your My Orders dashboard at any time.</p>
      </div>
    </div>
  `;
}

function printOrderInvoice(orderId) {
  const order = window.store.orders.find(o => o.id === orderId);
  if (!order) return;

  const invoiceWindow = window.open('', '_blank', 'width=850,height=900');
  invoiceWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Invoice_${order.id}</title>
        <link rel="stylesheet" href="css/dashboard.css">
        <style>
          body { padding: 20px; background: white; }
          @media print {
            body { padding: 0; }
          }
        </style>
      </head>
      <body>
        ${generateInvoiceHTML(order)}
        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `);
  invoiceWindow.document.close();
}

window.printOrderInvoice = printOrderInvoice;
