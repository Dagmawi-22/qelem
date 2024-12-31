interface Section {
  title: string;
  subPdfs: { title: string; path: string }[];
}

export const PDF_SECTIONS: Section[] = [
  {
    title: "Section 1",
    subPdfs: [
      { title: "Document 1.1", path: require("../assets/pdfs/ict.pdf") },
      { title: "Document 1.2", path: require("../assets/pdfs/ict.pdf") },
    ],
  },
  {
    title: "Section 2",
    subPdfs: [
      { title: "Document 2.1", path: require("../assets/pdfs/ict.pdf") },
      { title: "Document 2.2", path: require("../assets/pdfs/ict.pdf") },
    ],
  },
];
