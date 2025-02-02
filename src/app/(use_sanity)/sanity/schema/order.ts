
export const orderSchema = {
    name : 'order',
    title : 'Order',
    type  :'document',
    fields: [
      {
        name: "orderNumber",
        title: "Order Number",
        type: "string",
      },
        {
            name: 'products',
            title: 'Products',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  { name: 'name', type: 'string' },
                  { name: 'quantity', type: 'number' },
                  { name: 'price', type: 'number' },
                  { name: 'sizes', type: 'string' },
                  {
                    name: 'image',
                    type: 'reference',
                    to: [{ type: 'image' }],
                  },
                ],
              },
            ],
          },
        {
        name: 'totalprice',
        title: 'Total Price',
        type: 'number',
        },
        {
        name: 'orderdate',
        title: 'Order Date',
        type: 'datetime',
        },
        {
          name: "customer",
          title: "Customer",
          type: "reference",
          to: [{ type: "customer" }],
        },
     
    ]
}