"""Regenerate the current one-page resume. Requires reportlab and pypdf.

Run: python scripts/generate-resume.py [--font-dir PATH]
The WWG entry is shared with the website in src/resume-wwg.json.
Uses Calibri (Windows) or Carlito (metrically compatible) from --font-dir.
"""
import argparse
import html
import json
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from pypdf import PdfReader

root = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--font-dir', default='C:/Windows/Fonts')
args = parser.parse_args()
fonts = Path(args.font_dir)
regular, bold = fonts / 'calibri.ttf', fonts / 'calibrib.ttf'
if not regular.exists():
    regular, bold = fonts / 'Carlito-Regular.ttf', fonts / 'Carlito-Bold.ttf'
pdfmetrics.registerFont(TTFont('Resume', str(regular)))
pdfmetrics.registerFont(TTFont('Resume-Bold', str(bold)))
pdfmetrics.registerFontFamily('Resume', normal='Resume', bold='Resume-Bold')
data = json.loads((root / 'scripts/resume-template.json').read_text(encoding='utf-8'))
wwg = json.loads((root / 'src/resume-wwg.json').read_text(encoding='utf-8'))
output = root / 'public/Treena_Lynch_Resume.pdf'
body = ParagraphStyle('body', fontName='Resume', fontSize=10, leading=12.6, spaceAfter=2.1)
bullet = ParagraphStyle('bullet', parent=body, leftIndent=12, bulletIndent=0, bulletFontName='Resume', bulletFontSize=10)
section = ParagraphStyle('section', parent=body, fontName='Resume-Bold', spaceBefore=8, spaceAfter=3, keepWithNext=True)
company = ParagraphStyle('company', parent=body, fontName='Resume-Bold', spaceBefore=3, spaceAfter=2, keepWithNext=True)
dates = ParagraphStyle('dates', parent=body, alignment=2)
story = []
def markup(text):
    return html.escape(text).replace('&lt;b&gt;', '<b>').replace('&lt;/b&gt;', '</b>')
def para(text, style=body): return Paragraph(markup(text), style)
def heading(text):
    story.extend([para(text, section), HRFlowable(width='100%', thickness=.5, color=colors.HexColor('#282828'), spaceAfter=4)])
story.append(para(data['name'], ParagraphStyle('name', parent=body, fontSize=24, leading=29, spaceAfter=5)))
story.append(para(data['contact']))
story.append(para(data['headline'], ParagraphStyle('headline', parent=body, fontName='Resume-Bold', fontSize=10.5, leading=13, textColor=colors.HexColor('#9C360C'), spaceAfter=2)))
heading('PROFILE'); story.append(para(data['profile']))
heading('SKILLS')
skills = Table([[para('<b>'+label+'</b>'), para(text)] for label,text in data['skills']], colWidths=[104,428.6])
skills.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),0),('TOPPADDING',(0,0),(-1,-1),0),('BOTTOMPADDING',(0,0),(-1,-1),2)]))
story.append(skills)
heading('EXPERIENCE')
for job in data['experience']:
    row = Table([[para(job['heading'], company), para(job['dates'], dates)]], colWidths=[440,92.6])
    row.setStyle(TableStyle([('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),0),('TOPPADDING',(0,0),(-1,-1),2),('BOTTOMPADDING',(0,0),(-1,-1),0),('VALIGN',(0,0),(-1,-1),'TOP')]))
    row.keepWithNext=True
    story.append(row)
    for text in job['bullets']: story.append(Paragraph(markup(text),bullet,bulletText='•'))
story.append(para(wwg['heading'], company))
for text in wwg['bullets']: story.append(Paragraph(markup(text),bullet,bulletText='•'))
heading('EDUCATION')
for text in data['education']: story.append(para(text))
SimpleDocTemplate(str(output),pagesize=(612,792),leftMargin=39.7,rightMargin=39.7,topMargin=33,bottomMargin=32,
    title='Treena M. Lynch — Resume',author='Treena M. Lynch').build(story)
reader = PdfReader(output)
assert len(reader.pages) == 1, 'Resume must retain the one-page template; inspect layout before delivery.'
text = ' '.join(reader.pages[0].extract_text().split())
for expected in [wwg['heading'], *wwg['bullets']]:
    assert ' '.join(expected.split()) in text, 'WWG wording differs from shared source'
assert 'WCF' not in text and '.asmx' not in text
print(f'Generated {output.name}: one page; exact WWG text verified.')
