export interface PDFScreenProps {
  pdfPath: string | undefined;
  onBack: () => void;
}

export interface PdfSource {
  uri: string | undefined;
  cache?: boolean;
  enableAntialiasing?: boolean;
  enableAnnotationRendering?: boolean;
}
