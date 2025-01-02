interface Section {
  title: string;
  subPdfs: { title: string; path: string; cover?: string }[];
}

export const PDF_SECTIONS: Section[] = [
  {
    title: "Section 1",
    subPdfs: [
      {
        title: "ICT",
        path: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        cover: require("../assets/covers/12/ict.png"),
      },
      {
        title: "Chemistry",
        path: "http://samples.leanpub.com/thereactnativebook-sample.pdf",
        cover: require("../assets/covers/12/agri.png"),
      },
    ],
  },
  {
    title: "Section 2",
    subPdfs: [
      {
        title: "Biology",
        path: "http://samples.leanpub.com/thereactnativebook-sample.pdf",
        cover: require("../assets/covers/12/agri.png"),
      },
      {
        title: "Agri",
        path: "http://samples.leanpub.com/thereactnativebook-sample.pdf",
        cover: require("../assets/covers/12/agri.png"),
      },
    ],
  },
];
