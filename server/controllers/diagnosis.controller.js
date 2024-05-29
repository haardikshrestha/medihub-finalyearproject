const Diagnosis = require("../models/diagnosisSchema")
const nodemailer = require("nodemailer");
const express = require('express');
const cors = require('cors');
const app = express();
const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const newDiagnosis = () => async (req, res) => {
  try {
    console.log("hey")
    const { patientName, patientEmail, diagnosis, medications, notes } = req.body;

    if (!patientName || !patientEmail || !diagnosis || !medications) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const html = `
      <html>
        <head>
          <style>
            /* Add your CSS styles here */
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            h1 {
              color: #333;
            }
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1>Diagnosis Report</h1>
          <p>Patient Name: ${patientName}</p>
          <p>Patient Email: ${patientEmail}</p>
          <p>Diagnosis: ${diagnosis}</p>
          <h2>Medications</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Dosage</th>
                <th>Time of Day</th>
                <th>Before/After Eating</th>
              </tr>
            </thead>
            <tbody>
              ${medications.map(
                (medication) => `
                <tr>
                  <td>${medication.name}</td>
                  <td>${medication.dosage}</td>
                  <td>${medication.timeOfDay}</td>
                  <td>${medication.beforeOrAfterEating}</td>
                </tr>
              `
              ).join('')}
            </tbody>
          </table>
          <p>Notes: ${notes}</p>
        </body>
      </html>
    `;

    const pdfBuffer = await new Promise((resolve, reject) => {
      pdf.create(html).toBuffer((err, buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer);
        }
      });
    });

    const newDiagnosis = new Diagnosis({
      patientName,
      patientEmail,
      diagnosis,
      medications,
      notes,
      pdfBuffer
    });

    const savedDiagnosis = await newDiagnosis.save();

    const mailOptions = {
      from: 'app.medihub@gmail.com', 
      to: patientEmail,
      subject: 'Diagnosis Report',
      text: 'Please find attached your diagnosis report.',
      attachments: [
        {
          filename: `diagnosis-report-${savedDiagnosis._id}.pdf`,
          content: pdfBuffer
        }
      ]
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Diagnosis submitted successfully', diagnosis: savedDiagnosis });
  } catch (error) {
    console.log('Error submitting diagnosis:', error);
    res.status(500).json(error);
  }
};

const DiagnosisController = {
    newDiagnosis
};

module.exports = DiagnosisController;
