import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.vfs;

pdfMake.fonts = {
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf",
  },
  THSarabunNew: {
    normal: "THSarabunNew.ttf",
    bold: "THSarabunNew-Bold.ttf",
    italics: "THSarabunNew-Italic.ttf",
    bolditalics: "THSarabunNew-BoldItalic.ttf",
  },
};

export const generateParcelsReport = (
  parcels
) => {
  console.log(parcels);
  const partGovernment = "Head office";
  const organizationName = "Tritong hospital";
  const parcelType = "Material Type";
  const parcelName = "Computer";

  const tableHeader = [
    {
      text: "Arrival Date",
      alignment: "center",
      bold: true,
    },
    {
      text: "No./Code",
      alignment: "center",
      bold: true,
    },
    {
      text: "Parcel Type",
      alignment: "center",
      bold: true,
    },
    {
      text: "Parcel Name",
      alignment: "center",
      bold: true,
    },
    {
      text: "Brand...",
      alignment: "center",
      bold: true,
    },
    {
      text: "Prices",
      alignment: "center",
      bold: true,
    },
    {
      text: "How To Get",
      alignment: "center",
      bold: true,
    },
    {
      text: "Remark",
      alignment: "center",
      bold: true,
    },
  ];

  let bodyTable = [];

  bodyTable = parcels.map(
    ({
      arrivalDate,
      numberOrCode,
      parcelType,
      parcelName,
      brandTypeModelSizeDescrip,
      unitPrice,
      howToGet,
      parcelRemark,
    }) => {
      const formattedArrivalDate = new Date(
        arrivalDate
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      return [
        {
          text: formattedArrivalDate,
        },
        { text: numberOrCode },
        { text: parcelType },
        { text: parcelName },
        { text: brandTypeModelSizeDescrip },
        {
          text: unitPrice.toLocaleString("th-TH"),
        },
        { text: howToGet },
        { text: parcelRemark },
      ];
    }
  );

  bodyTable.unshift(tableHeader);

  const docDefinition = {
    pageOrientation: "landscape",
    pageSize: "A4",
    pageMargins: 50,
    header: function (
      currentPage,
      pageCount,
      pageSize
    ) {
      //ad logic
      return {
        columns: [
          {
            text: `page ${currentPage}/${pageCount}`,
            alignment: "right",
            margin: [0, 10, 10, 0],
          },
        ],
      };
    },
    footer: function (
      currentPage,
      pageCount,
      pageSize
    ) {
      //ad logic
      return {
        columns: [
          {
            text: new Date().toLocaleString(),
            alignment: "left",
            margin: [10, 10, 0, 0],
          },
          {
            text: "createb by Admin",
            alignment: "right",
            margin: [0, 10, 10, 0],
          },
        ],
      };
    },
    content: [
      {
        text: "Parcel Report",
        bold: true,
        fontSize: 28,
        alignment: "center",
        margin: [0, 0, 0, 20],
      },
      {
        table: {
          widths: [178, 178, 178, 178],
          body: [
            [
              `Hight Section: ${partGovernment}`,
              `Org: ${organizationName}`,
              `Parcel Type: ${parcelType}`,
              `Parce Name: ${parcelName}`,
            ],
          ],
        },
        margin: [0, 0, 0, 30],
        // bold: true,
      },
      {
        layout: "Borders",
        table: {
          headerRows: 1,
          widths: [
            // 98, 98, 98, 98, 98, 98, 98, 98,
            "*",
            "*",
            "*",
            "*",
            "*",
            "*",
            "*",
            "*",
          ],
          body: bodyTable,
        },
      },
    ],
    // styles: {
    //   header: {
    //     fontSize: 20,
    //     bold: true,
    //     margin: [0, 0, 0, 10],
    //   },
    // },
    defaultStyle: {
      font: "THSarabunNew",
      fontSize: 14,
    }, // ใช้ default font หรือ custom ได้
  };

  pdfMake.createPdf(docDefinition).open();

  // .download("parcels_report.pdf");
};
