export const PRODUCTS = {
  "daganghub": {
    "accent": "#f09545",
    "currency": "IDR",
    "tagline": "From first order to a growing business.",
    "modules": [
      {
        "key": "products",
        "label": "Produk",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "sku",
            "label": "SKU",
            "type": "text",
            "required": true
          },
          {
            "key": "price",
            "label": "Harga jual",
            "type": "money",
            "required": true
          },
          {
            "key": "cost",
            "label": "Harga modal",
            "type": "money"
          },
          {
            "key": "stock",
            "label": "Stok",
            "type": "number",
            "required": true,
            "min": 0
          },
          {
            "key": "category",
            "label": "Kategori",
            "type": "text"
          },
          {
            "key": "notes",
            "label": "Catatan",
            "type": "textarea"
          }
        ],
        "statuses": [
          "active",
          "archived"
        ]
      },
      {
        "key": "customers",
        "label": "Pelanggan",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "email",
            "label": "Email",
            "type": "email"
          },
          {
            "key": "phone",
            "label": "Nomor telepon",
            "type": "text"
          },
          {
            "key": "address",
            "label": "Alamat",
            "type": "textarea"
          },
          {
            "key": "tags",
            "label": "Tag",
            "type": "text"
          }
        ],
        "statuses": [
          "active",
          "archived"
        ]
      },
      {
        "key": "suppliers",
        "label": "Pemasok",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "email",
            "label": "Email",
            "type": "email"
          },
          {
            "key": "phone",
            "label": "Nomor telepon",
            "type": "text"
          },
          {
            "key": "address",
            "label": "Alamat",
            "type": "textarea"
          }
        ],
        "statuses": [
          "active",
          "archived"
        ]
      },
      {
        "key": "orders",
        "label": "Pesanan",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "customer_id",
            "label": "Pelanggan",
            "type": "ref",
            "ref": "customers",
            "required": true
          },
          {
            "key": "items",
            "label": "Item pesanan",
            "type": "items",
            "required": true
          },
          {
            "key": "date",
            "label": "Tanggal",
            "type": "date",
            "required": true
          },
          {
            "key": "notes",
            "label": "Catatan",
            "type": "textarea"
          }
        ],
        "statuses": [
          "draft",
          "confirmed",
          "paid",
          "shipped",
          "completed",
          "cancelled"
        ],
        "actions": [
          "confirm-order",
          "invoice-order",
          "pay-order",
          "ship-order",
          "complete-order",
          "cancel-order"
        ]
      },
      {
        "key": "invoices",
        "label": "Invoice",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "order_id",
            "label": "Pesanan",
            "type": "ref",
            "ref": "orders",
            "required": false
          },
          {
            "key": "customer_id",
            "label": "Pelanggan",
            "type": "ref",
            "ref": "customers",
            "required": false
          },
          {
            "key": "amount",
            "label": "Jumlah",
            "type": "money"
          },
          {
            "key": "due_date",
            "label": "Jatuh tempo",
            "type": "date"
          },
          {
            "key": "notes",
            "label": "Catatan",
            "type": "textarea"
          }
        ],
        "statuses": [
          "unpaid",
          "paid",
          "void"
        ]
      },
      {
        "key": "expenses",
        "label": "Pengeluaran",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "amount",
            "label": "Jumlah",
            "type": "money"
          },
          {
            "key": "date",
            "label": "Tanggal",
            "type": "date",
            "required": true
          },
          {
            "key": "category",
            "label": "Kategori",
            "type": "text"
          },
          {
            "key": "notes",
            "label": "Catatan",
            "type": "textarea"
          }
        ],
        "statuses": [
          "active",
          "archived"
        ]
      },
      {
        "key": "stock_movements",
        "label": "Mutasi stok",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "product_id",
            "label": "Produk",
            "type": "ref",
            "ref": "products",
            "required": true
          },
          {
            "key": "quantity",
            "label": "Perubahan stok (+/-)",
            "type": "number",
            "required": true
          },
          {
            "key": "date",
            "label": "Tanggal",
            "type": "date",
            "required": true
          },
          {
            "key": "notes",
            "label": "Catatan",
            "type": "textarea"
          }
        ],
        "statuses": [
          "pending",
          "posted"
        ],
        "actions": [
          "post-stock"
        ]
      },
      {
        "key": "campaigns",
        "label": "Kampanye",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "channel",
            "label": "Kanal",
            "type": "text"
          },
          {
            "key": "visits",
            "label": "Kunjungan",
            "type": "number",
            "min": 0
          },
          {
            "key": "leads",
            "label": "Lead",
            "type": "number",
            "min": 0
          },
          {
            "key": "sales",
            "label": "Transaksi",
            "type": "number",
            "min": 0
          },
          {
            "key": "revenue",
            "label": "Pendapatan",
            "type": "money"
          },
          {
            "key": "spend",
            "label": "Biaya",
            "type": "money"
          },
          {
            "key": "date",
            "label": "Tanggal",
            "type": "date",
            "required": true
          }
        ],
        "statuses": [
          "active",
          "archived"
        ]
      },
      {
        "key": "shipments",
        "label": "Pengiriman",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "order_id",
            "label": "Pesanan",
            "type": "ref",
            "ref": "orders",
            "required": true
          },
          {
            "key": "carrier",
            "label": "Kurir",
            "type": "text"
          },
          {
            "key": "tracking",
            "label": "Nomor resi",
            "type": "text"
          },
          {
            "key": "address",
            "label": "Alamat",
            "type": "textarea"
          }
        ],
        "statuses": [
          "pending",
          "shipped",
          "delivered"
        ]
      },
      {
        "key": "menus",
        "label": "Menu & bundel",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "items",
            "label": "Isi produk",
            "type": "items",
            "required": true
          },
          {
            "key": "price",
            "label": "Harga bundel",
            "type": "money"
          },
          {
            "key": "notes",
            "label": "Catatan",
            "type": "textarea"
          }
        ],
        "statuses": [
          "active",
          "archived"
        ]
      },
      {
        "key": "contacts",
        "label": "CRM aktivitas",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "customer_id",
            "label": "Pelanggan",
            "type": "ref",
            "ref": "customers",
            "required": true
          },
          {
            "key": "date",
            "label": "Tanggal",
            "type": "date",
            "required": true
          },
          {
            "key": "channel",
            "label": "Kanal",
            "type": "select",
            "options": [
              "whatsapp",
              "phone",
              "email",
              "meeting"
            ]
          },
          {
            "key": "notes",
            "label": "Catatan",
            "type": "textarea"
          }
        ],
        "statuses": [
          "planned",
          "done"
        ]
      },
      {
        "key": "pricing",
        "label": "Kalkulator margin",
        "tool": "pricing",
        "fields": []
      },
      {
        "key": "reports",
        "label": "Laporan",
        "tool": "reports",
        "fields": [],
        "statuses": []
      }
    ],
    "id": "daganghub",
    "name": "DagangHub",
    "purpose": "Sistem operasional usaha dari produk dan pelanggan sampai pesanan, stok, invoice, pemasaran dan pengiriman.",
    "sources": [
      "daganghub",
      "rosari-commerce",
      "warungrosari",
      "waconvert",
      "wahagenius-crm",
      "ledger",
      "ledgerflow",
      "invensight",
      "priceforge",
      "menumaster",
      "motopart",
      "attribution-hub",
      "resi-flow"
    ],
    "workflow": "Produk + pelanggan → pesanan draft → konfirmasi dengan pemeriksaan stok atomik → invoice → pembayaran → pengiriman → laporan; pembatalan mengembalikan stok tepat sekali."
  }
};
