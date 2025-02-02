
export const customerSchema = {
    name : 'customer',
    title : 'Customer',
    type  :'document',
    fields: [
      {
        name: "customername",
        title: "Customer Name",
        type: "string",
      },
             {
        name: 'number',
        title: 'Number',
        type: 'string',
        },
             {
        name: 'email',
        title: 'Email',
        type: 'string',
        },
        {
        name: 'address',
        title: 'Address',
        type: 'string',
        },
        {
        name: 'city',
        title: 'City',
        type: 'string',
        },
        {
        name: 'province',
        title: 'Province',
        type: 'string',
        },
        {
        name: 'postalcode',
        title: 'Postal Code',
        type: 'string',
        },
        {
            name: "order",
            title: "Order",
            type: "array",
            of: [{ type: "reference", to: [{ type: "order" }] }], 
          }
     
    ]
}