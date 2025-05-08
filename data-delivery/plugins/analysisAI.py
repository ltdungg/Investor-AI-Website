import google.generativeai as genai
import re

def extract_body_content(html_text):
  body_match = re.search(r'<body[^>]*>(.*?)</body>', html_text, re.IGNORECASE | re.DOTALL)
  if body_match:
    return body_match.group(1).strip()

  return None

def generate_analysis_content(pdf_text, html, api_key):
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-2.0-flash")

    prompt = f"""
        Đây là nội dung của file pdf báo cáo tài chính:
        {pdf_text}

        Đây là nội dung của file html mẫu template.html:
        {html}

        Đây là phần yêu cầu:
        Hãy đọc các số liệu báo cáo tài chính trong file pdf và điền vào phần <body> từ template HTML mẫu này và sử dụng các style bên trong file template.
        Điền thêm các chi tiết từ trong báo cáo pdf vào cho đầy đặn

        và loại bỏ các đường dẫn chú thích đến file pdf ví dụ như là [cite: 12].
        ngôn ngữ là "Tiếng Việt".
        Sử dụng cả table, ul, li để thêm đẹp mắt và liệt kê các ý chính.
        Kết quả chỉ bao gồm phần <body>
    """

    response = model.generate_content(prompt)

    body = extract_body_content(response.text)

    return body