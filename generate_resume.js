const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const doc = new PDFDocument({ margin: 50, size: 'A4' });

doc.pipe(fs.createWriteStream(path.join(__dirname, 'public', 'Urvisha_Panchal_Resume.pdf')));

const primaryColor = '#1a1a1a';
const secondaryColor = '#0ea5e9';
const textColor = '#444444';
const lightText = '#666666';

// Header
doc.font('Helvetica-Bold').fontSize(24).fillColor(primaryColor).text('URVISHA RAJESHKUMAR PANCHAL', { align: 'left' });
doc.font('Helvetica-Bold').fontSize(14).fillColor(secondaryColor).text('Full Stack Developer', { align: 'left' }).moveDown(0.5);

doc.font('Helvetica').fontSize(10).fillColor(lightText)
   .text('Ahmedabad, Gujarat  •  panchalurvisha147@gmail.com  •  9825637433', { align: 'left' })
   .moveDown(1.5);

// Profile Summary
doc.font('Helvetica-Bold').fontSize(12).fillColor(primaryColor).text('PROFILE SUMMARY');
doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor('#eeeeee').stroke().moveDown(0.5);

doc.font('Helvetica').fontSize(10).fillColor(textColor).lineGap(4)
   .text('Full Stack Developer with hands-on experience building ERP systems, POS platforms, CRM dashboards, HRMS applications, investment platforms, and business websites using Next.js, React.js, Node.js, Express.js, PostgreSQL, PHP, SQL, Tailwind CSS, Framer Motion, and WordPress.')
   .moveDown(0.5)
   .text('Experienced in developing scalable web applications, responsive user interfaces, REST API integrations, database-driven systems, admin panels, inventory management solutions, billing modules, and reporting dashboards.')
   .moveDown(1.5);

// Technical Skills
doc.font('Helvetica-Bold').fontSize(12).fillColor(primaryColor).text('TECHNICAL SKILLS');
doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor('#eeeeee').stroke().moveDown(0.5);

const startY = doc.y;

// Frontend
doc.font('Helvetica-Bold').fontSize(10).fillColor(primaryColor).text('Frontend', 50, startY);
doc.font('Helvetica').fontSize(10).fillColor(textColor)
   .text('• Next.js, React.js', 50, doc.y + 3)
   .text('• JavaScript (ES6+)')
   .text('• HTML5 / CSS3')
   .text('• Tailwind CSS')
   .text('• Framer Motion');

// Backend
doc.font('Helvetica-Bold').fontSize(10).fillColor(primaryColor).text('Backend', 180, startY);
doc.font('Helvetica').fontSize(10).fillColor(textColor)
   .text('• Node.js', 180, doc.y + 3)
   .text('• Express.js')
   .text('• PHP')
   .text('• REST API');

// Database
doc.font('Helvetica-Bold').fontSize(10).fillColor(primaryColor).text('Database', 300, startY);
doc.font('Helvetica').fontSize(10).fillColor(textColor)
   .text('• PostgreSQL', 300, doc.y + 3)
   .text('• MySQL')
   .text('• SQL');

// Other
doc.font('Helvetica-Bold').fontSize(10).fillColor(primaryColor).text('Other Skills', 400, startY);
doc.font('Helvetica').fontSize(10).fillColor(textColor)
   .text('• Git & GitHub', 400, doc.y + 3)
   .text('• State Management')
   .text('• ERP & CRM')
   .text('• SEO Optimization');

doc.moveDown(2).x = 50;

// Experience
doc.font('Helvetica-Bold').fontSize(12).fillColor(primaryColor).text('PROFESSIONAL EXPERIENCE');
doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor('#eeeeee').stroke().moveDown(0.5);

doc.font('Helvetica-Bold').fontSize(11).fillColor(primaryColor).text('Full Stack Developer', { continued: true })
   .font('Helvetica').fontSize(10).fillColor(lightText).text('  |  September 2025 – Present', { align: 'right' }).moveDown(0.5);

doc.font('Helvetica').fontSize(10).fillColor(textColor)
   .text('• Developed and maintained ERP, POS, CRM, and HRMS applications using Next.js, React.js, Node.js, and Express.js.')
   .text('• Built reusable frontend components and scalable application structures.')
   .text('• Designed and implemented responsive user interfaces using Tailwind CSS and Framer Motion.')
   .text('• Integrated REST APIs and managed application data flow across multiple business modules.')
   .text('• Worked with PostgreSQL and SQL databases for data management and reporting features.')
   .text('• Developed dashboards for sales, inventory, HR, payroll, and analytics systems.')
   .text('• Contributed to backend functionality and API development for enterprise applications.')
   .moveDown(1.5);

// Projects
doc.font('Helvetica-Bold').fontSize(12).fillColor(primaryColor).text('HIGHLIGHTED PROJECTS');
doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor('#eeeeee').stroke().moveDown(0.5);

doc.font('Helvetica-Bold').fontSize(10).fillColor(primaryColor).text('Singhai Ji Store ERP & POS System');
doc.font('Helvetica').fontSize(10).fillColor(textColor)
   .text('• Developed ERP modules including Inventory, Stock Transfer, HR, Payroll, GST, Billing, and Analytics.')
   .text('• Built customizable invoice systems supporting 80mm and A4 formats.').moveDown(0.5);

doc.font('Helvetica-Bold').fontSize(10).fillColor(primaryColor).text('GVoice CRM & HRMS');
doc.font('Helvetica').fontSize(10).fillColor(textColor)
   .text('• Developed login authentication flow and super admin dashboard.')
   .text('• Created company management and user management modules.')
   .text('• Contributed to employee management, attendance, leave management, and payroll related modules.').moveDown(0.5);

doc.font('Helvetica-Bold').fontSize(10).fillColor(primaryColor).text('Catalyst Software & NatureEnergy Website');
doc.font('Helvetica').fontSize(10).fillColor(textColor)
   .text('• Contributed to the development of an investment and financial management platform using Next.js.')
   .text('• Developed a complete production-ready website for NatureEnergy using Next.js and Tailwind CSS.').moveDown(1.5);

// Education
doc.font('Helvetica-Bold').fontSize(12).fillColor(primaryColor).text('EDUCATION');
doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor('#eeeeee').stroke().moveDown(0.5);

doc.font('Helvetica').fontSize(10).fillColor(textColor)
   .text('• Master of Computer Applications (MCA)')
   .text('• Bachelor of Computer Applications (BCA)');

doc.end();
console.log('PDF generated successfully!');
