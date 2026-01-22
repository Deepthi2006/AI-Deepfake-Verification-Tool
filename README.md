
# 🛡️ AI Deepfake Verification Tool 

> 🚨 **Prototype / Demo Project**
> This project is a **lightweight, demo-only prototype** built for hackathon evaluation.
> It visually demonstrates how **AI-assisted deepfake detection and content authenticity verification** could work — focusing on **explainability over heavy ML accuracy**.

---

## 📌 Problem Statement

With the rapid rise of **AI-generated deepfake images and videos**, law enforcement agencies and the public face challenges in:

* Verifying the authenticity of digital media
* Quickly flagging suspicious or manipulated content
* Explaining *why* content is considered fake or authentic

Heavy AI models are expensive, slow, and impractical for quick field-level verification.

---

## 🎯 Goal of This Project

To build a **low-cost, web-based prototype** that:

* Demonstrates how deepfake detection *could* work
* Uses **rule-based logic + simulated AI scores**
* Focuses on **interpretability and transparency**
* Runs smoothly in **low-resource environments**

This prototype was submitted to the **Nilgiri Police Hackathon**.

---

## 🧠 Solution Overview

**AI Deepfake Verification Tool** allows users to:

1. Upload an image or video
2. Extract and analyze basic metadata
3. Run simulated AI checks
4. Generate a final **Authenticity Score**
5. Automatically decide a verdict:

   * ✅ Verified Content
   * ⚠️ Suspicious
   * 🚨 Likely Manipulated

---

## 🧩 Core Features (Prototype Level)

### 📤 Media Upload

* Supports image & video files
* No login required

### 🧾 Metadata Extraction (Real Logic)

* File type
* File size
* Duration (for videos)
* Creation timestamp (if available)
* Metadata consistency check

### 🤖 Simulated “AI Checks” (Mock Logic)

To avoid heavy ML models, the system generates **mock AI scores**:

* **Face Consistency Score**
* **Audio–Video Sync Score**
* **Metadata Integrity Score** (real rule-based logic)

### 📊 Authenticity Score (0–100)

A weighted calculation based on all checks.

### 🧠 Agentic Decision Logic

The system automatically decides verdicts:

| Score Range | Verdict                     |
| ----------- | --------------------------- |
| ≥ 70        | ✅ Verified Content          |
| 50 – 69     | ⚠️ Suspicious               |
| < 50        | 🚨 Alert: Possible Deepfake |

### 🔐 Verification Hash (Simulated)

* Uses **SHA-256** to generate a fake “verification hash”
* No real blockchain (clearly stated)

---

## 🎨 UI / UX Highlights

* Clean dashboard layout
* Upload section + results section
* Visual score bars
* Status badge (color-coded)
* Explanation text for each verdict
* Mobile-friendly
* Clearly labeled as **Prototype / Demo**

---

## 🧱 Tech Stack

### Backend

* **Node.js + Express**
* TypeScript
* PostgreSQL (local)
* dotenv (environment variables)

### Frontend

* Vite
* HTML, CSS, JavaScript
* No heavy UI libraries (lightweight)

### Database

* **PostgreSQL**
* Stores analysis results & metadata

---

## 🗄️ Database Design (PostgreSQL)

### Database Creation

A local PostgreSQL database was created:

```sql
CREATE DATABASE deepfake_verify;
```

### Environment Variable

A `.env` file is used:

```env
DATABASE_URL=postgresql://postgres:<password>@localhost:5432/deepfake_verify
```

### Schema Initialization

Database tables are created using:

```bash
npm run db:push
```

This command:

* Pushes schema
* Creates tables like `analyses`
* Prepares DB for storing results

---

## ▶️ How to Run the Project (Local)

### 1️⃣ Install Dependencies

```bash
npm install
```

---

### 2️⃣ Setup Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://postgres:<password>@localhost:5432/deepfake_verify
PORT=5000
```

---

### 3️⃣ Initialize Database

```bash
npm run db:push
```

---

### 4️⃣ Start Development Server

```bash
npm run dev
```

---

### 5️⃣ Access the App

* Frontend: `http://localhost:5173`
* Backend API: `http://localhost:5000`

---

## 🔍 Viewing Data in PostgreSQL

Using **pgAdmin**:

1. Open pgAdmin
2. Navigate to:

   ```
   deepfake_verify → Schemas → public → Tables → analyses
   ```
3. Right-click → **View/Edit Data → All Rows**

Each upload & analysis inserts a new row.

---

## ⚠️ Important Notes

* ❗ This is **NOT a production system**
* ❗ AI scores are **simulated**
* ❗ No real ML models or blockchain are used
* ✅ Focus is on **workflow, explainability, and system design**

---

## 🏆 Hackathon Relevance

This prototype demonstrates:

* Practical AI-assisted verification workflow
* Low-cost deployment feasibility
* Transparency & explainability
* Real backend + database integration

---

## 📌 Future Improvements

* Integrate real lightweight ML models
* Add forensic image analysis
* Improve metadata anomaly detection
* Secure evidence chain
* Role-based access for law enforcement

---

## 🙌 Acknowledgement

Built and submitted as part of the **Nilgiri Police Hackathon**
for demonstrating **responsible AI usage in digital media verification**.

---

