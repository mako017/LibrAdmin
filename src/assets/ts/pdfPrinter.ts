import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "app/node_modules/@types/pdfmake/interfaces";
import { CatalogueItem } from "src/components/models";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function createTestLabel(test: CatalogueItem, print = false) {
  const docDefinition: TDocumentDefinitions = {
    pageSize: { width: 170, height: "auto" },
    pageMargins: [5, 5],
    info: {
      title: test.abbreviation,
      author: "LibrAdmin"
    },
    content: [
      {
        text: "Testothek der Fachrichtung Psychologie",
        alignment: "left",
        fontSize: 8,
        margin: [0, 5, 0, 0]
      },
      {
        text: "Geb A1.3, 3. OG",
        alignment: "left",
        fontSize: 8,
        margin: [0, 0, 0, 20]
      },
      {
        qr: "https://testothek.uni-saarland.de/#/catalogue/" + test.itemID,
        alignment: "center",
        margin: [0, 0, 0, 20]
      },
      {
        columns: [
          {
            text: test.itemID,
            alignment: "left",
            fontSize: 8,
            margin: [0, 10, 0, 0]
          },
          {
            image: "eule",
            alignment: "right",
            width: 50,
            height: 20.25
          }
        ]
      },
      {
        text: " ",
        alignment: "left",
        fontSize: 8
      }
    ],
    images: {
      eule:
        "https://upload.wikimedia.org/wikipedia/de/thumb/b/bc/Logo-Universit%C3%A4t_des_Saarlandes.svg/200px-Logo-Universit%C3%A4t_des_Saarlandes.svg.png"
    }
  };
  if (print) {
    pdfMake.createPdf(docDefinition).print();
    return;
  }
  pdfMake.createPdf(docDefinition).download(test.abbreviation);
}

export function createContract() {
  const docDefinition: TDocumentDefinitions = {
    pageSize: "A4",
    pageMargins: [10, 10],
    info: {
      title: "Ausleihschein",
      author: "LibrAdmin"
    },
    header: {
      columns: [
        {
          image: "eule",
          alignment: "left",
          width: 80,
          margin: [35, 4, 0, 0]
        },
        {
          text: "FAKULTÄT HW\nFACHRICHTUNG PSYCHOLOGIE\nTESTOTHEK",
          color: "#004877",
          fontSize: 10,
          bold: true,
          alignment: "right",
          margin: [0, 4, 35, 0]
        }
      ]
    },
    content: [
      {
        text: "Ausleihschein",
        alignment: "center",
        fontSize: 16,
        bold: true,
        margin: [0, 20]
      },
      {
        columns: [
          {
            table: {
              body: [
                [{ text: "Pers. Daten", bold: true, colSpan: 2 }, {}],
                ["Name:", "Max Mustermann"],
                ["E-Mail:", "m.muster@m.mustermann.de"],
                ["Benutzername:", "mamu01"]
              ]
            },
            layout: "lightHorizontalLines"
          },
          {
            table: {
              body: [
                [{ text: "Bearbeitet von", bold: true, colSpan: 2 }, {}],
                ["Name:", "Max Mustermann"],
                ["E-Mail:", "m.muster@m.mustermann.de"]
              ]
            },
            layout: "lightHorizontalLines",
            margin: [10, 0, 0, 0]
          }
        ]
      },
      {
        text: "Ausgeliehene Tests:",
        bold: true,
        margin: [0, 10, 0, 10]
      },
      {
        ul: ["Test 1", "Test 2", "Test 3"]
      },
      {
        text:
          "Hiermit bestätige ich, dass ich die oben genannten Tests ausgeliehen habe und spätestens am DD.MM.YYYY vollständig und unbeschädigt zurückbringe.",
        alignment: "justify",
        margin: [0, 10]
      },
      {
        text: "Saarbrücken, den DD.MM.YYYY",
        decoration: "overline",
        alignment: "right",
        margin: [0, 50, 0, 0]
      }
    ],
    images: {
      eule:
        "https://upload.wikimedia.org/wikipedia/de/thumb/b/bc/Logo-Universit%C3%A4t_des_Saarlandes.svg/200px-Logo-Universit%C3%A4t_des_Saarlandes.svg.png"
    }
  };
  pdfMake.createPdf(docDefinition).download("contract");
}
