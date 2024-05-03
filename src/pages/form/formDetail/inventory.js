const statusList = ["LOW", "AVAILABLE", "NOT_AVAILABLE"]

export const inventoryForm = [
    [{
        id: "itemCode",
        title: "Item Code",
        type: "text",
        placeholder: "Code",
        description: "auto generated",
    },
        {
            id: "itemDesc",
            title: "Description",
            type: "text",
            placeholder: "Description",
            description: "Item Description",
        }],
    [
        {
            id: "category",
            title: "Category",
            type: "text",
            placeholder: "Category",
            description: "Shoe type",
        },
        {
            id: "size",
            title: "Size",
            type: "number",
            placeholder: "Size",
            description: "Shoe size",
        }
    ],
    [
        {
            id: "supplierCode",
            title: "supplier Code",
            type: "text",
            placeholder: "supplier Code",
            description: "",
        },
        {
            id: "supplierName",
            title: "supplier Name",
            type: "text",
            placeholder: "supplier Name",
            description: "",
        }
    ],
    [
        {
            id: "saleUnitPrice",
            title: "Sale Price",
            type: "number",
            placeholder: "Price",
            description: "Sale - Unit Price",
        },
        {
            id: "buyUnitPrice",
            title: "Buying Price",
            type: "number",
            placeholder: "Price",
            description: "Buy - Unit Price"
        }
    ],
    [
        {
            id: "expectedProfit",
            title: "Expected Profit",
            type: "number",
            placeholder: "Profit",
            description: "Expected profit of the item",
        },
        {
            id: "profitMargin",
            title: "Profit Margin",
            type: "number",
            placeholder: "Margin",
            description: "Percentage of the profit against the sale price"
        }
    ],
    [
        {
            id: "status",
            title: "Item Status",
            type: "select",
            placeholder: "Status",
            description: "",
            selectList: statusList
        }

    ]
]