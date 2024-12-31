interface Section {
  title: string;
  subPdfs: { title: string; path: string }[];
}

export const PDF_SECTIONS: Section[] = [
  {
    title: "Section 1",
    subPdfs: [
      { title: "ICT", path: require("../assets/pdfs/ict.pdf") },
      { title: "Chemistry", path: require("../assets/pdfs/ict.pdf") },
    ],
  },
  {
    title: "Section 2",
    subPdfs: [
      { title: "Biology", path: require("../assets/pdfs/ict.pdf") },
      { title: "Agri", path: require("../assets/pdfs/ict.pdf") },
    ],
  },
];
