
import Complaint from "../models/complaint.js";
import { sendEmail } from "../utils/sendEmail.js";
import User from "../models/User.js";

export const createComplaint = async (req, res) => {
  try {
    const complaintData = { ...req.body };
    if (req.file) {
      complaintData.image = req.file.filename;
    }
    const complaint = await Complaint.create(complaintData);

    // 📧 ADMIN MAIL WITH FULL USER DETAILS
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "📢 New Complaint Submitted",
      html: `
        <h2>New Complaint Received</h2>
        <hr/>

        <p><b>Name:</b> ${complaint.fullName}</p>
        <p><b>Email:</b> ${complaint.email}</p>
        <p><b>Phone:</b> ${complaint.phoneNumber}</p>

        <p><b>Location Type:</b> ${complaint.locationType}</p>
        ${
          complaint.locationType === "hostel"
            ? `
              <p><b>Hostel:</b> ${complaint.hostelType}</p>
              <p><b>Block:</b> ${complaint.block}</p>
              <p><b>Floor:</b> ${complaint.floor}</p>
              <p><b>Room No:</b> ${complaint.roomNo}</p>
            `
            : `
              <p><b>College Building:</b> ${complaint.collegeBuilding}</p>
              <p><b>Floor:</b> ${complaint.floor}</p>
              <p><b>Room No:</b> ${complaint.roomNo}</p>
            `
        }

        <p><b>Category:</b> ${complaint.complaintCategory || "N/A"}</p>
        <p><b>Issue Type:</b> ${complaint.issueType}</p>
        <p><b>Description:</b> ${complaint.problemDescription}</p>

        <p><b>Status:</b> ${complaint.status}</p>
      `,
    });

    // 📧 STUDENT CONFIRMATION MAIL
    await sendEmail({
      to: complaint.email,
      subject: "Complaint Registered Successfully",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #0052FF; margin: 0;">Complaint Registered</h2>
            <p style="color: #4b5563; font-size: 14px; margin-top: 5px;">Your complaint request was received successfully.</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;"/>
          <p>Dear ${complaint.fullName},</p>
          <p>We have successfully registered your request. Our maintenance team has been notified and will address it shortly.</p>
          
          <h3 style="color: #1f2937; margin-top: 25px; margin-bottom: 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Complaint Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 14px;">
            <tr style="background-color: #f9fafb;">
              <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold; width: 40%;">Complaint ID</td>
              <td style="padding: 10px; border: 1px solid #e5e7eb; color: #0052FF; font-weight: bold;">${complaint.complaintId}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Student Name</td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">${complaint.fullName}</td>
            </tr>
            <tr style="background-color: #f9fafb;">
              <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Complaint Category</td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">${complaint.complaintCategory || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Issue Type</td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">${complaint.issueType}</td>
            </tr>
            <tr style="background-color: #f9fafb;">
              <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Complaint Location</td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">
                ${
                  complaint.locationType === "hostel"
                    ? `${complaint.hostelType} Hostel • Block ${complaint.block} • Floor ${complaint.floor} • Room ${complaint.roomNo}`
                    : `${complaint.collegeBuilding} Building • Room ${complaint.roomNo}`
                }
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Date & Time</td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">${new Date(complaint.createdAt).toLocaleString()}</td>
            </tr>
            <tr style="background-color: #f9fafb;">
              <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Current Status</td>
              <td style="padding: 10px; border: 1px solid #e5e7eb; color: #d97706; font-weight: bold;">${complaint.status}</td>
            </tr>
          </table>
          
          <p style="font-size: 13px; color: #6b7280; text-align: center; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 15px;">
            You can track the live status of your complaint on the CampusFix portal.
          </p>
        </div>
      `,

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// import Complaint from "../models/complaint.js";
// import { sendEmail } from "../utils/sendEmail.js";

export const updateComplaintStatus = async (req, res) => {
  try {
    // 🔥 ONLY status frontend nundi vastundi
    const { status } = req.body;

    // 🔥 DB nundi FULL complaint fetch
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // 📧 USER MAIL — ALL DETAILS FROM BACKEND (DB)
    if (status === "In Progress") {
      await sendEmail({
        to: complaint.email,
        subject: "Complaint Under Progress",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
            <h2 style="color: #2563EB; margin-top: 0;">Complaint Under Progress</h2>
            <p>Dear ${complaint.fullName},</p>
            <p>Our maintenance team has started working on your complaint.</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
              <tr style="background-color: #f9fafb;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold; width: 40%;">Complaint ID</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb; color: #2563EB; font-weight: bold;">${complaint.complaintId}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Current Status</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;"><span style="background-color: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">${complaint.status}</span></td>
              </tr>
              <tr style="background-color: #f9fafb;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Expected Response</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">Usually resolved within 24-48 hours.</td>
              </tr>
            </table>
            <p>Thank you for your patience.</p>
            <p>Best regards,<br/>CampusFix Team</p>
          </div>
        `,
      });
    } else if (status === "Fixed") {
      await sendEmail({
        to: complaint.email,
        subject: "Complaint Resolved Successfully",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
            <h2 style="color: #10B981; margin-top: 0;">Complaint Resolved Successfully</h2>
            <p>Dear ${complaint.fullName},</p>
            <p>We are pleased to inform you that your complaint has been resolved successfully. Thank you for bringing this issue to our attention.</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
              <tr style="background-color: #f9fafb;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold; width: 40%;">Complaint ID</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb; color: #10B981; font-weight: bold;">${complaint.complaintId}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Student Name</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${complaint.fullName}</td>
              </tr>
              <tr style="background-color: #f9fafb;">
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Resolution Date</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${new Date().toLocaleDateString()}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Updated Status</td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;"><span style="background-color: #d1fae5; color: #065f46; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">Resolved</span></td>
              </tr>
            </table>
            <p>Thank you for helping us keep our campus safe and functional.</p>
            <p>Best regards,<br/>CampusFix Team</p>
          </div>
        `,
      });
    } else {
      await sendEmail({
        to: complaint.email,
        subject: "🔄 Complaint Status Updated – CampusFix",
        html: `
          <h3>Hello ${complaint.fullName},</h3>
          <p>Your complaint has been updated. Details below:</p>
          <ul>
            ${complaint.complaintCategory ? `<li><b>Category:</b> ${complaint.complaintCategory}</li>` : ""}
            <li><b>Issue:</b> ${complaint.issueType}</li>
            <li><b>Location:</b> ${complaint.location}</li>
            <li><b>Priority:</b> ${complaint.priorityLevel}</li>
            <li><b>Status:</b> <b>${complaint.status}</b></li>
            <li><b>Description:</b> ${complaint.problemDescription}</li>
          </ul>
          <p>Thank you,<br/>CampusFix Team</p>
        `,
      });
    }

    res.json({
      message: "Status updated & mail sent",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





/* =========================
   GET ALL COMPLAINTS (ADMIN)
   ========================= */
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   GET USER COMPLAINTS
   ========================= */
export const getUserComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   COMPLAINT STATS (ADMIN)
   ========================= */
export const getComplaintStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const total = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: "Pending" });
    const inProgress = await Complaint.countDocuments({ status: "In Progress" });
    const resolved = await Complaint.countDocuments({ status: "Fixed" });

    res.json({ users, total, pending, inProgress, resolved });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
