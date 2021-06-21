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
        qr: "https://testothek.uni-saarland.de/catalogue/?test=" + test.itemID,
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
