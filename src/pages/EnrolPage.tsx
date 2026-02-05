import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, Download, User, Users, HelpCircle, ShieldCheck, Upload } from 'lucide-react';

const steps = [
    { id: 1, title: "Child's Information", icon: <User size={20} /> },
    { id: 2, title: "Parent/Guardian's Information", icon: <Users size={20} /> },
    { id: 3, title: 'Uploads', icon: <Upload size={20} /> },
    { id: 4, title: 'How Did You Hear About Us', icon: <HelpCircle size={20} /> },
    { id: 5, title: 'Declaration', icon: <ShieldCheck size={20} /> }
];

const EnrolPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Section 1: Child's Information
        firstName: '',
        otherNames: '',
        lastName: '',
        nationality: '',
        gradeApplied: '',
        age: '',
        gender: '',
        dob: '',
        previousSchool: '',
        medicalConditions: 'No',
        medicalDetails: '',
        useTransport: 'No',
        stationCode: '',
        allergies: 'No',
        allergyDetails: '',
        // Section 2: Parent/Guardian's Information
        parentFirst: '',
        parentOther: '',
        parentLast: '',
        parentNationality: '',
        occupation: '',
        placeOfWork: '',
        parentID: '',
        relationship: '',
        email: '',
        phone1: '',
        phone2: '',
        phone1IsWhatsApp: 'Yes',
        whatsappNumber: '',
        // Section 3: Uploads
        assessmentResults: null as File | null,
        childPhoto: null as File | null,
        // Section 4: How Did You Hear About Us
        referral: '',
        applyReason: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        }
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const generateOfficialPDF = async () => {
        const { jsPDF } = await import('jspdf');
        const doc = new jsPDF();
        const refNo = `ENR - 2026 - ${Math.floor(1000 + Math.random() * 9000)}`;

        // Helper for checkboxes
        const checkBox = (condition: boolean) => condition ? '[ X ]' : '[   ]';

        // --- Header ---
        doc.setFont('times', 'bold');
        doc.setFontSize(18);
        doc.text('TWALUMBU EDUCATION CENTRE', 105, 15, { align: 'center' });

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text('ENROLLMENT APPLICATION FORM', 20, 28);

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`REF NO: ${refNo}`, 130, 28);

        // --- Official Use Only Box ---
        doc.setDrawColor(0);
        doc.rect(20, 33, 170, 45); // Height 45, ends at 78

        doc.setFont('helvetica', 'bold');
        doc.text('FOR OFFICIAL USE ONLY', 25, 32);

        doc.setFont('helvetica', 'normal');
        // Row 1
        doc.text('Class Allocated: _______________________', 25, 40);
        doc.text('Student ID: ________________________', 110, 40);

        // Row 2
        doc.text('Term Enrolled:', 25, 48);
        doc.text('[  ] Term 1   [  ] Term 2   [  ] Term 3', 25, 53);

        doc.text('Transport Assigned:  [  ] Yes  [  ] No', 110, 48);
        doc.text('Station Code: _____________________', 110, 53);

        // Row 3 (Status & Stamp)
        doc.text('Enrollment Status:', 25, 60);
        doc.text('[  ] Accepted   [  ] Waitlisted   [  ] Rejected', 25, 65);

        doc.text('Stamp', 140, 63);

        // --- Section 1: Child's Details ---
        const sec1Top = 75;
        doc.rect(20, sec1Top, 170, 95); // Increased height for new fields

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text('Section 1 - Child\'s Information', 25, sec1Top + 8);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);

        // Left Column
        doc.text(`First Name: ${formData.firstName}`, 25, sec1Top + 18);
        doc.line(45, sec1Top + 19, 95, sec1Top + 19);

        doc.text(`Other Name: ${formData.otherNames}`, 25, sec1Top + 26);
        doc.line(47, sec1Top + 27, 95, sec1Top + 27);

        doc.text(`Nationality: ${formData.nationality}`, 25, sec1Top + 34);
        doc.line(45, sec1Top + 35, 95, sec1Top + 35);

        doc.text(`Date of Birth: ${formData.dob}`, 25, sec1Top + 42);
        doc.text(`Age: ${formData.age}`, 25, sec1Top + 50);

        doc.text(`Previous School: ${formData.previousSchool}`, 25, sec1Top + 58);
        doc.line(52, sec1Top + 59, 95, sec1Top + 59);

        doc.text(`Medical Conditions? ${checkBox(formData.medicalConditions === 'Yes')} Yes ${checkBox(formData.medicalConditions === 'No')} No`, 25, sec1Top + 68);
        doc.text(`If yes, specify: ${formData.medicalDetails}`, 25, sec1Top + 74);
        doc.line(48, sec1Top + 75, 95, sec1Top + 75);

        doc.text(`Grade Applied for: ${formData.gradeApplied}`, 25, sec1Top + 83);
        doc.line(55, sec1Top + 84, 95, sec1Top + 84);

        // Right Column
        doc.text(`Last Name: ${formData.lastName}`, 105, sec1Top + 18);
        doc.line(125, sec1Top + 19, 180, sec1Top + 19);

        doc.text(`Gender:   ${checkBox(formData.gender === 'Male')} Male    ${checkBox(formData.gender === 'Female')} Female`, 105, sec1Top + 34);

        doc.text(`Any Allergies? ${checkBox(formData.allergies === 'Yes')} Yes ${checkBox(formData.allergies === 'No')} No`, 105, sec1Top + 50);
        doc.text(`If yes, specify: ${formData.allergyDetails}`, 105, sec1Top + 56);
        doc.line(128, sec1Top + 57, 180, sec1Top + 57);

        doc.text('Will the learner use school transport?', 105, sec1Top + 66);
        doc.text(`${checkBox(formData.useTransport === 'Yes')} Yes    ${checkBox(formData.useTransport === 'No')} No`, 105, sec1Top + 71);
        doc.text(`Code: ${formData.stationCode}`, 105, sec1Top + 79);
        doc.line(116, sec1Top + 80, 180, sec1Top + 80);


        // --- Section 2: Parent Details ---
        const sec2Top = 175;
        doc.rect(20, sec2Top, 170, 80); // Increased height for new fields

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text('Section 2 - Parent/Guardian Information', 25, sec2Top + 8);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);

        // Left Column
        doc.text(`First Name: ${formData.parentFirst}`, 25, sec2Top + 18);
        doc.line(45, sec2Top + 19, 95, sec2Top + 19);

        doc.text(`Other Name: ${formData.parentOther}`, 25, sec2Top + 26);
        doc.line(47, sec2Top + 27, 95, sec2Top + 27);

        doc.text(`Nationality: ${formData.parentNationality}`, 25, sec2Top + 34);
        doc.line(45, sec2Top + 35, 95, sec2Top + 35);

        doc.text('ID Number (NRC/Passport/License):', 25, sec2Top + 42);
        doc.text(`${formData.parentID}`, 25, sec2Top + 48);
        doc.line(25, sec2Top + 49, 95, sec2Top + 49);

        doc.text('Phone Number 1:', 25, sec2Top + 56)
        doc.text(`${formData.phone1}`, 55, sec2Top + 56);
        doc.line(55, sec2Top + 57, 95, sec2Top + 57);

        doc.text('Phone Number 2:', 25, sec2Top + 64);
        doc.text(`${formData.phone2 || 'N/A'}`, 55, sec2Top + 64);
        doc.line(55, sec2Top + 65, 95, sec2Top + 65);

        doc.text('WhatsApp Number:', 25, sec2Top + 72);
        const whatsappDisplay = formData.phone1IsWhatsApp === 'Yes'
            ? `${formData.phone1} (Same as Phone 1)`
            : (formData.whatsappNumber || 'N/A');
        doc.text(whatsappDisplay, 55, sec2Top + 72);
        doc.line(55, sec2Top + 73, 95, sec2Top + 73);

        // Right Column
        doc.text(`Last Name: ${formData.parentLast}`, 105, sec2Top + 18);
        doc.line(125, sec2Top + 19, 180, sec2Top + 19);

        doc.text(`Occupation: ${formData.occupation}`, 105, sec2Top + 26);
        doc.line(125, sec2Top + 27, 180, sec2Top + 27);

        doc.text(`Place of Work: ${formData.placeOfWork}`, 105, sec2Top + 34);
        doc.line(130, sec2Top + 35, 180, sec2Top + 35);

        doc.text(`Relationship: ${formData.relationship}`, 105, sec2Top + 42);
        doc.line(128, sec2Top + 43, 180, sec2Top + 43);

        doc.text(`Email: ${formData.email}`, 105, sec2Top + 50);
        doc.line(116, sec2Top + 51, 180, sec2Top + 51);

        // --- Section 3: Uploads Note ---
        const sec3Top = 260;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text('Section 3 - Uploaded Documents', 25, sec3Top);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(`Assessment Results: ${formData.assessmentResults ? '✓ Attached to email' : 'Not provided'}`, 25, sec3Top + 8);
        doc.text(`Child Photo: ${formData.childPhoto ? '✓ Attached to email' : 'Not provided'}`, 25, sec3Top + 14);


        // --- Footer ---
        doc.setFontSize(9);
        doc.text('1', 105, 280, { align: 'center' });
        doc.setFontSize(8);
        doc.text('Generated by Twalumbu Education Online Portal', 105, 285, { align: 'center' });

        doc.save(`Application_${formData.lastName}_${refNo}.pdf`);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(async () => {
            await generateOfficialPDF();
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 2000);
    };

    const stepVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 }
    };

    return (
        <>
            <div className="enrol-page">
                <div className="container">
                    <div className="enrol-header">
                        <h1>Enrolment Application</h1>
                        <p>Begin your child's journey at Twalumbu Education Centre. Please fill in the details below carefully.</p>
                    </div>

                    <div className="enrol-container glass">
                        {/* Progress Indicator */}
                        <div className="enrol-steps">
                            {steps.map((step) => (
                                <div
                                    key={step.id}
                                    className={`step-item ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
                                    onClick={() => currentStep > step.id && setCurrentStep(step.id)}
                                >
                                    <div className="step-icon">
                                        {currentStep > step.id ? <Check size={18} /> : step.icon}
                                    </div>
                                    <span className="step-title">{step.title}</span>
                                </div>
                            ))}
                        </div>

                        <form className="enrol-form" onSubmit={handleSubmit}>
                            <AnimatePresence mode="wait">
                                {isSuccess ? (
                                    <motion.div
                                        className="success-view"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                    >
                                        <div className="success-lottie">✓</div>
                                        <h2>Application Submitted!</h2>
                                        <p>Your enrollment application has been processed. A PDF copy has been downloaded for your records, and a confirmation email has been sent to both you and the school administration.</p>
                                        <button className="btn-primary" onClick={() => window.location.href = '/'}>Return to Home</button>
                                        <button className="btn-secondary glass ml-4" onClick={generateOfficialPDF}>
                                            <Download size={18} />
                                            Download Again
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key={currentStep}
                                        variants={stepVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        transition={{ duration: 0.3 }}
                                    >
                                        {currentStep === 1 && (
                                            <div className="step-content">
                                                <h3>Section 1 – Child's Information</h3>
                                                <div className="form-grid-3">
                                                    <div className="form-group">
                                                        <label>First Name *</label>
                                                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Last Name *</label>
                                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Other Name(s)</label>
                                                        <input type="text" name="otherNames" value={formData.otherNames} onChange={handleInputChange} />
                                                    </div>
                                                </div>
                                                <div className="form-grid-3">
                                                    <div className="form-group">
                                                        <label>Nationality *</label>
                                                        <input type="text" name="nationality" value={formData.nationality} onChange={handleInputChange} required />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Grade Being Applied For *</label>
                                                        <select name="gradeApplied" value={formData.gradeApplied} onChange={handleInputChange} required>
                                                            <option value="">Select Grade</option>
                                                            <option value="Baby Class">Baby Class</option>
                                                            <option value="Middle Class">Middle Class</option>
                                                            <option value="Reception">Reception</option>
                                                            <option value="Grade 1">Grade 1</option>
                                                            <option value="Grade 2">Grade 2</option>
                                                            <option value="Grade 3">Grade 3</option>
                                                            <option value="Grade 4">Grade 4</option>
                                                            <option value="Grade 5">Grade 5</option>
                                                            <option value="Grade 6">Grade 6</option>
                                                            <option value="Grade 7">Grade 7</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Age of the Child *</label>
                                                        <input type="number" name="age" min="1" max="20" value={formData.age} onChange={handleInputChange} required />
                                                    </div>
                                                </div>
                                                <div className="form-grid">
                                                    <div className="form-group">
                                                        <label>Gender *</label>
                                                        <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                                                            <option value="">Select Gender</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Date of Birth *</label>
                                                        <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Previous School</label>
                                                    <input type="text" name="previousSchool" placeholder="Name of previous school (if any)" value={formData.previousSchool} onChange={handleInputChange} />
                                                </div>
                                                <div className="form-grid">
                                                    <div className="form-group">
                                                        <label>Medical Conditions?</label>
                                                        <div className="radio-group">
                                                            <label><input type="radio" name="medicalConditions" value="Yes" checked={formData.medicalConditions === 'Yes'} onChange={handleInputChange} /> Yes</label>
                                                            <label><input type="radio" name="medicalConditions" value="No" checked={formData.medicalConditions === 'No'} onChange={handleInputChange} /> No</label>
                                                        </div>
                                                        {formData.medicalConditions === 'Yes' && (
                                                            <input type="text" name="medicalDetails" placeholder="Please specify" value={formData.medicalDetails} onChange={handleInputChange} className="mt-2" />
                                                        )}
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Any Allergies?</label>
                                                        <div className="radio-group">
                                                            <label><input type="radio" name="allergies" value="Yes" checked={formData.allergies === 'Yes'} onChange={handleInputChange} /> Yes</label>
                                                            <label><input type="radio" name="allergies" value="No" checked={formData.allergies === 'No'} onChange={handleInputChange} /> No</label>
                                                        </div>
                                                        {formData.allergies === 'Yes' && (
                                                            <input type="text" name="allergyDetails" placeholder="Please specify" value={formData.allergyDetails} onChange={handleInputChange} className="mt-2" />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Will the Child be using other Services Like the Bus?</label>
                                                    <div className="radio-group">
                                                        <label><input type="radio" name="useTransport" value="Yes" checked={formData.useTransport === 'Yes'} onChange={handleInputChange} /> Yes</label>
                                                        <label><input type="radio" name="useTransport" value="No" checked={formData.useTransport === 'No'} onChange={handleInputChange} /> No</label>
                                                    </div>
                                                    {formData.useTransport === 'Yes' && (
                                                        <input type="text" name="stationCode" placeholder="Station Code (if known)" value={formData.stationCode} onChange={handleInputChange} className="mt-2" />
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {currentStep === 2 && (
                                            <div className="step-content">
                                                <h3>Section 2 – Parent/Guardian's Information</h3>
                                                <div className="form-grid-3">
                                                    <div className="form-group">
                                                        <label>First Name *</label>
                                                        <input type="text" name="parentFirst" value={formData.parentFirst} onChange={handleInputChange} required />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Last Name *</label>
                                                        <input type="text" name="parentLast" value={formData.parentLast} onChange={handleInputChange} required />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Other Name(s)</label>
                                                        <input type="text" name="parentOther" value={formData.parentOther} onChange={handleInputChange} />
                                                    </div>
                                                </div>
                                                <div className="form-grid">
                                                    <div className="form-group">
                                                        <label>Nationality *</label>
                                                        <input type="text" name="parentNationality" value={formData.parentNationality} onChange={handleInputChange} required />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Identification Number (NRC/Passport/Driver's License) *</label>
                                                        <input type="text" name="parentID" value={formData.parentID} onChange={handleInputChange} required />
                                                    </div>
                                                </div>
                                                <div className="form-grid">
                                                    <div className="form-group">
                                                        <label>Occupation *</label>
                                                        <input type="text" name="occupation" value={formData.occupation} onChange={handleInputChange} required />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Place of Work *</label>
                                                        <input type="text" name="placeOfWork" value={formData.placeOfWork} onChange={handleInputChange} required />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Relation to the Child *</label>
                                                    <input type="text" name="relationship" placeholder="e.g., Mother, Father, Guardian" value={formData.relationship} onChange={handleInputChange} required />
                                                </div>
                                                <div className="form-grid-3">
                                                    <div className="form-group">
                                                        <label>Email Address *</label>
                                                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Phone Number 1 *</label>
                                                        <input type="tel" name="phone1" value={formData.phone1} onChange={handleInputChange} required />
                                                        <div className="checkbox-group mt-2">
                                                            <label>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={formData.phone1IsWhatsApp === 'Yes'}
                                                                    onChange={(e) => setFormData(prev => ({
                                                                        ...prev,
                                                                        phone1IsWhatsApp: e.target.checked ? 'Yes' : 'No',
                                                                        whatsappNumber: e.target.checked ? '' : prev.whatsappNumber
                                                                    }))}
                                                                /> This number is also my WhatsApp contact
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Phone Number 2</label>
                                                        <input type="tel" name="phone2" value={formData.phone2} onChange={handleInputChange} />
                                                    </div>
                                                </div>
                                                {formData.phone1IsWhatsApp === 'No' && (
                                                    <div className="form-group">
                                                        <label>WhatsApp Number *</label>
                                                        <input type="tel" name="whatsappNumber" placeholder="Enter your WhatsApp number" value={formData.whatsappNumber} onChange={handleInputChange} required />
                                                    </div>
                                                )}
                                            </div>
                                        )}


                                        {currentStep === 3 && (
                                            <div className="step-content">
                                                <h3>Section 3 – Uploads</h3>
                                                <p className="section-description">Please upload the required documents. Both files will be sent as attachments in the enrollment email.</p>
                                                <div className="form-grid">
                                                    <div className="form-group">
                                                        <label>Upload Assessment Results *</label>
                                                        <input
                                                            type="file"
                                                            name="assessmentResults"
                                                            accept=".pdf,.jpg,.jpeg,.png"
                                                            onChange={handleFileChange}
                                                            required
                                                        />
                                                        <small className="help-text">Accepted formats: PDF, JPG, PNG (Max 5MB)</small>
                                                        {formData.assessmentResults && (
                                                            <div className="file-preview">✓ {formData.assessmentResults.name}</div>
                                                        )}
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Upload Picture of the Child *</label>
                                                        <input
                                                            type="file"
                                                            name="childPhoto"
                                                            accept=".jpg,.jpeg,.png"
                                                            onChange={handleFileChange}
                                                            required
                                                        />
                                                        <small className="help-text">Accepted formats: JPG, PNG (Max 5MB)</small>
                                                        {formData.childPhoto && (
                                                            <div className="file-preview">✓ {formData.childPhoto.name}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {currentStep === 4 && (
                                            <div className="step-content">
                                                <h3>Section 4 – How Did You Hear About Us?</h3>
                                                <div className="form-group">
                                                    <label>How did you find out about the school? *</label>
                                                    <select name="referral" value={formData.referral} onChange={handleInputChange} required>
                                                        <option value="">Select Source</option>
                                                        <option value="Social Media">Social Media</option>
                                                        <option value="Friend/Relative">Friend / Relative</option>
                                                        <option value="Google Search">Google Search</option>
                                                        <option value="Radio">Radio Advertisement</option>
                                                        <option value="Newspaper">Newspaper</option>
                                                        <option value="Billboard">Billboard</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label>Why did you choose to bring your child to our school?</label>
                                                    <textarea name="applyReason" rows={4} placeholder="Please share your reasons for choosing Twalumbu Education Centre..." value={formData.applyReason} onChange={handleInputChange}></textarea>
                                                </div>
                                            </div>
                                        )}

                                        {currentStep === 5 && (
                                            <div className="step-content">
                                                <h3>Section 5 – Declaration</h3>
                                                <div className="declaration-box">
                                                    <p>I hereby declare that all information provided in this application is true, complete, and accurate to the best of my knowledge. I confirm that I have read, understood, and agree to abide by the rules, policies, and regulations of <strong>Twalumbu Education Centre</strong>.</p>
                                                    <p>I further grant consent for the school to obtain and administer emergency medical treatment for my child when necessary, should I be unreachable.</p>
                                                </div>
                                                <div className="form-group checkbox-group">
                                                    <label>
                                                        <input type="checkbox" required /> I agree to the terms and conditions stated above.
                                                    </label>
                                                </div>
                                            </div>
                                        )}

                                        <div className="enrol-footer">
                                            {currentStep > 1 && (
                                                <button type="button" className="btn-secondary glass" onClick={prevStep}>
                                                    <ChevronLeft size={18} /> Back
                                                </button>
                                            )}
                                            {currentStep < steps.length ? (
                                                <button type="button" className="btn-primary" onClick={nextStep} style={{ marginLeft: 'auto' }}>
                                                    Next Step <ChevronRight size={18} />
                                                </button>
                                            ) : (
                                                <button type="submit" className="btn-primary" disabled={isSubmitting} style={{ marginLeft: 'auto' }}>
                                                    {isSubmitting ? 'Processing...' : 'Submit Application'}
                                                    <ShieldCheck size={18} className="ml-2" />
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </div>
                </div>
            </div>

            <style>{`
        .enrol-page {
          padding: 80px 0;
          min-height: 100vh;
          background: var(--background);
        }

        .enrol-header {
          text-align: center;
          margin-bottom: 60px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .enrol-header h1 {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .enrol-container {
          max-width: 900px;
          margin: 0 auto;
          background: #fff;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 40px 80px rgba(var(--primary-hsl), 0.1);
          border: 1px solid rgba(0,0,0,0.05);
        }

        .enrol-steps {
          display: flex;
          background: #f8f9fa;
          padding: 30px;
          border-bottom: 1px solid #eee;
          justify-content: space-between;
        }

        .step-item {
          display: flex;
          align-items: center;
          gap: 12px;
          opacity: 0.5;
          transition: all 0.3s ease;
          position: relative;
        }

        .step-item.active {
          opacity: 1;
          color: var(--primary);
        }

        .step-item.completed {
          opacity: 1;
          color: var(--secondary-dark);
          cursor: pointer;
        }

        .step-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .step-item.active .step-icon {
          border-color: var(--primary);
          background: var(--primary);
          color: #fff;
        }

        .step-item.completed .step-icon {
          border-color: var(--secondary);
          background: var(--secondary);
          color: var(--primary);
        }

        .step-title {
          font-weight: 700;
          font-size: 0.9rem;
        }

        .enrol-form {
          padding: 40px;
          min-height: 500px;
        }

        .step-content h3 {
          margin-bottom: 30px;
          color: var(--primary);
          font-size: 1.5rem;
          border-left: 4px solid var(--secondary);
          padding-left: 15px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .form-grid-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-group label {
          display: block;
          font-weight: 700;
          font-size: 0.85rem;
          margin-bottom: 8px;
          color: var(--text);
        }

        .form-group input, .form-group select, .form-group textarea {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #ddd;
          border-radius: var(--radius-sm);
          font-family: inherit;
        }

        .radio-group {
          display: flex;
          gap: 20px;
          padding-top: 10px;
        }

        .radio-group label {
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .declaration-box {
          background: #f8f9fa;
          padding: 24px;
          border-radius: var(--radius-md);
          margin-bottom: 24px;
          font-size: 0.95rem;
          color: var(--text-muted);
        }

        .declaration-box p {
          margin-bottom: 12px;
        }

        .enrol-footer {
          display: flex;
          margin-top: 40px;
          padding-top: 30px;
          border-top: 1px solid #eee;
        }

        .enrol-footer button {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .success-view {
          text-align: center;
          padding: 60px 20px;
        }

        .success-lottie {
          width: 100px;
          height: 100px;
          background: #e6f7ef;
          color: #10b981;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          margin: 0 auto 30px;
        }


        .ml-4 { margin-left: 1rem; }
        .ml-2 { margin-left: 0.5rem; }
        .mt-2 { margin-top: 0.5rem; }

        .section-description {
          color: var(--text-muted);
          margin-bottom: 24px;
          font-size: 0.95rem;
        }

        .help-text {
          display: block;
          margin-top: 6px;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .file-preview {
          margin-top: 8px;
          padding: 8px 12px;
          background: #e6f7ef;
          color: #10b981;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          font-weight: 500;
        }

        input[type="file"] {
          padding: 10px 0 !important;
        }

        @media (max-width: 768px) {
          .enrol-steps {
            flex-direction: column;
            gap: 15px;
          }
          .form-grid, .form-grid-3 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </>
    );
};

export default EnrolPage;
