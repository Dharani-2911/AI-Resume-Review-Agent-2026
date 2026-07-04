import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Analyzes the resume text using Google Gemini AI.
 * @param {string} resumeText - The extracted text of the resume
 * @returns {Promise<Object>} - Parsed JSON object of the analysis
 */
export const analyzeResumeWithGemini = async (resumeText) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('API Key Missing: Please define VITE_GEMINI_API_KEY in your .env file to enable Gemini AI analysis.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Use gemini-2.5-flash for faster execution and structured JSON capability
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.5-flash',
  });

  const prompt = `
You are a top-tier HR consultant, senior hiring manager, and ATS (Applicant Tracking System) expert. 
Your task is to analyze the following resume text and provide a thorough, critical, and constructive review.

Return your response STRICTLY as a JSON object matching the schema below. 
Do not include any Markdown headers, code block formatting (such as \`\`\`json), or trailing text outside of the JSON object. 
Ensure the JSON is fully valid and parseable.

JSON Schema:
{
  "overallScore": 80, // Number (0-100) representing overall quality
  "atsScore": 75,     // Number (0-100) representing ATS scanner readability
  "strengths": ["strength item 1", "strength item 2"], // Minimum 3 items
  "weaknesses": ["weakness item 1", "weakness item 2"], // Minimum 3 items
  
  "assessments": {
    "technicalSkills": { "score": 85, "review": "Assessment text about technical depth and relevance" },
    "projectQuality": { "score": 70, "review": "Assessment text detailing project results, metrics, and scale" },
    "education": { "score": 90, "review": "Assessment of degree, school relevance, and graduation history" },
    "certifications": { "score": 60, "review": "Assessment of standard certs and recommendation for new ones" },
    "formatting": { "score": 80, "review": "Formatting review (readability, sections structure, layout density)" },
    "grammar": { "score": 95, "review": "Spelling, voice, and grammar quality check" },
    "keywordOptimization": { "score": 65, "review": "ATS keyword match and density evaluation" }
  },
  
  "suggestions": {
    "missingSkills": ["React", "Kubernetes"],
    "missingKeywords": ["Agile Methodology", "CI/CD Pipeline"],
    "improvements": [
      "Add quantifiable metrics to project accomplishments.",
      "Rewrite job bullet points starting with strong action verbs."
    ],
    "actionVerbs": [
      { "original": "Worked on", "suggested": "Spearheaded" },
      { "original": "Helped with", "suggested": "Facilitated" },
      { "original": "Was responsible for", "suggested": "Orchestrated" }
    ],
    "projectDescriptions": [
      {
        "original": "Built a website for client to sell items online using React.",
        "suggested": "Architected an end-to-end e-commerce platform using React, boosting customer checkouts by 24% and reducing page load by 350ms."
      }
    ],
    "careerObjective": "A forward-thinking software specialist with X years of hands-on experience driving code quality, performance metrics, and deployment scale. Seeking to join [Company] to leverage expertise in...",
    "skillsSection": "Core Technical Competencies:\n- Languages: JavaScript, Python, Java\n- Frameworks & Libs: React, Node.js, Express\n- Cloud & DevOps: AWS, Docker, GitHub Actions"
  },
  
  "roleAnalysis": {
    "Software Engineer": {
      "matchScore": 85,
      "missingSkills": ["Data Structures", "Algorithms"],
      "recommendations": ["Demonstrate proficiency in core computing concepts, system design, and algorithmic problem-solving."]
    },
    "Java Developer": {
      "matchScore": 60,
      "missingSkills": ["Spring Boot", "Hibernate", "Microservices"],
      "recommendations": ["Acquire foundational Java stack expertise including Spring framework ecosystem and RESTful service design."]
    },
    "Frontend Developer": {
      "matchScore": 75,
      "missingSkills": ["Tailwind CSS", "TypeScript", "State Management"],
      "recommendations": ["Highlight UI/UX styling architectures, responsive design implementations, and typescript types structure."]
    },
    "Full Stack Developer": {
      "matchScore": 70,
      "missingSkills": ["Docker", "Express.js", "SQL Databases"],
      "recommendations": ["Flesh out back-end server capabilities, database schema modeling, and application containerization practices."]
    }
  },
  
  "actionPlan": [
    {
      "priority": 1,
      "action": "Integrate metric-driven results into project details",
      "impact": "High",
      "description": "Convert tasks to accomplishments. Replace passive descriptions with statements like 'Optimized database queries, reducing retrieval time by 40%.'"
    },
    {
      "priority": 2,
      "action": "Restructure project bullet points with action verbs",
      "impact": "High",
      "description": "Substitute weak verbs like 'held meetings' or 'was in charge of' with punchy, metric-oriented verbs such as 'Governed', 'Authored', or 'Standardized'."
    },
    {
      "priority": 3,
      "action": "Include ATS Keywords from target roles",
      "impact": "Medium",
      "description": "Weave keywords like Agile Scrum, CI/CD, unit testing, and architectural design into your skills matrix and project sections naturally."
    },
    {
      "priority": 4,
      "action": "Reformat career summary to be value-first",
      "impact": "Medium",
      "description": "Shift your career summary from showing what you want, to showing what you bring to the table in terms of business impact."
    },
    {
      "priority": 5,
      "action": "Clean up skills section layout",
      "impact": "Low",
      "description": "Categorize skills systematically (Languages, Frameworks, Developer Tools) to make it skimmable for hiring managers in under 6 seconds."
    }
  ]
}

Resume Text to analyze:
---
${resumeText}
---
`;

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
      }
    });

    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Handle JSON parsing error or API failure
    if (error instanceof SyntaxError) {
      throw new Error('AI Analysis Error: The AI returned an invalid response format. Please try running the analysis again.');
    }
    
    throw new Error(error.message || 'AI Analysis Error: Could not connect to Gemini AI services. Please verify your connection and API key.');
  }
};

/**
 * Compares the resume text with a job description using Gemini AI.
 * @param {string} resumeText - The extracted text of the resume
 * @param {string} jobDescription - The target job description
 * @returns {Promise<Object>} - Parsed JSON object of the match analysis
 */
export const matchResumeWithJobDescription = async (resumeText, jobDescription) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('API Key Missing: Please define VITE_GEMINI_API_KEY in your .env file to enable Gemini AI analysis.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.5-flash',
  });

  const prompt = `
You are a senior technical recruiter and an ATS (Applicant Tracking System) matching engine.
Your task is to analyze the provided Resume and Job Description, and determine how well they match.

Return your response STRICTLY as a JSON object matching the schema below. 
Do not include any Markdown headers, code block formatting (such as \`\`\`json), or trailing text outside of the JSON object.
Ensure the JSON is fully valid and parseable.

JSON Schema:
{
  "matchScore": 75, // Number (0-100) representing how well the resume matches the job description
  "overallMatch": "Moderate", // String: "Strong", "Moderate", or "Weak"
  "matchingSkills": ["React", "JavaScript", "CSS"], // Array of strings (skills found in both the resume and the job description)
  "missingKeywords": ["TypeScript", "CI/CD", "AWS"], // Array of strings (keywords or terms found in the job description that are missing or weak in the resume)
  "recommendedSkills": ["GraphQL", "Docker"], // Array of strings (skills that would strengthen the candidate's alignment for this role)
  "suggestions": [
    "Highlight your experience with TypeScript more explicitly in the projects section.",
    "Add metric-driven bullets to your frontend optimization efforts to showcase impact."
  ] // Array of strings (specific actionable suggestions to improve this resume for this job description)
}

---
JOB DESCRIPTION:
${jobDescription}

---
RESUME TEXT:
${resumeText}
---
`;

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
      }
    });

    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error('Gemini API Error (Job Match):', error);
    
    if (error instanceof SyntaxError) {
      throw new Error('AI Match Error: The AI returned an invalid response format. Please try running the match analysis again.');
    }
    
    throw new Error(error.message || 'AI Match Error: Could not connect to Gemini AI services. Please verify your connection and API key.');
  }
};

