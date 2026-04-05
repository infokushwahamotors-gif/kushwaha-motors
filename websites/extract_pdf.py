import pypdf
import json
import os

def extract_text(pdf_path):
    if not os.path.exists(pdf_path):
        return f"File not found: {pdf_path}"
    
    reader = pypdf.PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text

def main():
    two_wheeler_pdf = "2 wheeler product.pdf"
    three_wheeler_pdf = "3 wheeler products.pdf"
    
    data = {
        "two_wheelers": extract_text(two_wheeler_pdf),
        "three_wheelers": extract_text(three_wheeler_pdf)
    }
    
    with open("extracted_products.json", "w") as f:
        json.dump(data, f, indent=4)
    
    print("Extraction complete. Data saved to extracted_products.json")

if __name__ == "__main__":
    main()
