import { useEffect, useState } from "react";

import pdfMake from "pdfmake/build/pdfmake";
import { vfs } from "../../public/vfs_fonts";
pdfMake.vfs = vfs;

pdfMake.fonts = {
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf",
  },
  Sarabun: {
    normal: "Sarabun-Regular.ttf",
    bold: "Sarabun-Bold.ttf",
    italics: "Sarabun-Italic.ttf",
    bolditalics: "Sarabun-BoldItalic.ttf",
  },
};

export const generateParcelsReport = async (
  parcels,
  user,
  orgName,
  higherSectionName,
  parcelType,
  parcelName
) => {
  // get user login to show on report
  const userReport = user.userName;

  const partGovernment = `${higherSectionName}`;
  const organizationName = `${orgName}`;
  const parcelTypeOnReport = `${parcelType}`;
  const parcelNameOnReport = `${parcelName}`;

  const tableHeader = [
    {
      text: "วดป.ที่ได้รับ",
      alignment: "center",
      bold: true,
    },
    {
      text: "เลขที่/รหัส",
      alignment: "center",
      bold: true,
    },
    {
      text: "ประเภทพัสดุ",
      alignment: "center",
      bold: true,
    },
    {
      text: "ชื่อพัสดุ",
      alignment: "center",
      bold: true,
    },
    {
      text: "ยี่ห้อ...",
      alignment: "center",
      bold: true,
    },
    {
      text: "ราคา/หน่วย (บาท)",
      alignment: "center",
      bold: true,
    },
    {
      text: "วิธีการได้มา",
      alignment: "center",
      bold: true,
    },
    {
      text: "หมายเหตุ",
      alignment: "center",
      bold: true,
    },
  ];

  let bodyTable = [];

  bodyTable = await parcels.map(
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
      ).toLocaleDateString("th-Th", {
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
            text: `createb by ${userReport}`,
            alignment: "right",
            margin: [0, 10, 10, 0],
          },
        ],
      };
    },
    content: [
      {
        text: "รายงานทะเบียนครุภัณฑ์",
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
              `ส่วนราชการ: ${partGovernment}`,
              `หน่วยงาน: ${organizationName}`,
              `ประเภท: ${parcelTypeOnReport}`,
              `ชื่อ/ชนิด: ${parcelNameOnReport}`,
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
      font: "Sarabun",
      fontSize: 14,
    }, // ใช้ default font หรือ custom ได้
  };

  pdfMake.createPdf(docDefinition).open();

  // .download("parcels_report.pdf");
};
