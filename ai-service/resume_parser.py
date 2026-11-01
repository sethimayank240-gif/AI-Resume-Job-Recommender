
from pathlib import Path
from io import BytesIO

import pymupdf
import pytesseract

from PIL import Image
from docx import Document


# Tesseract OCR executable path for Windows
pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)


def extract_text_from_pdf(file_path: str) -> str:
    """Extract text from normal and scanned PDF resumes."""

    extracted_pages = []

    with pymupdf.open(file_path) as document:

        for page_number, page in enumerate(document):

            # First, try normal PDF text extraction
            text = page.get_text("text").strip()

            # If no text is available, use OCR
            if not text:

                print(
                    f"Page {page_number + 1}: "
                    "No selectable text found. Using OCR..."
                )

                # Convert PDF page into an image at 300 DPI
                pix = page.get_pixmap(
                    matrix=pymupdf.Matrix(300 / 72, 300 / 72),
                    alpha=False
                )

                image_bytes = pix.tobytes("png")

                image = Image.open(
                    BytesIO(image_bytes)
                )

                # Extract text using Tesseract
                text = pytesseract.image_to_string(
                    image,
                    lang="eng"
                ).strip()

            extracted_pages.append(text)

    return "\n".join(extracted_pages).strip()


def extract_text_from_docx(file_path: str) -> str:
    """Extract text from a DOCX resume."""

    document = Document(file_path)

    text = "\n".join(
        paragraph.text
        for paragraph in document.paragraphs
        if paragraph.text.strip()
    )

    return text


def extract_resume_text(file_path: str) -> str:
    """Extract resume text based on the file extension."""

    extension = Path(file_path).suffix.lower()

    if extension == ".pdf":
        return extract_text_from_pdf(file_path)

    if extension == ".docx":
        return extract_text_from_docx(file_path)

    if extension == ".doc":
        raise ValueError(
            "Legacy .doc files are not supported yet. "
            "Please use PDF or DOCX."
        )

    raise ValueError(
        f"Unsupported file format: {extension}"
    )
