import {
  LayoutDashboard,
  CalendarClock,
  UsersRound,
  CreditCard,
  Settings,
  BriefcaseBusinessIcon,
  Code2Icon,
  User2Icon,
  Puzzle,
  Crown,
} from "lucide-react";

export const SideBarOptions = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    name: 'Schedule Interview',
    icon: CalendarClock,
    path: '/schedule-interview',
  },
  {
    name: 'All Interviews',
    icon: UsersRound,
    path: '/all-interview',
  },
  {
    name: 'Billing',
    icon: CreditCard,
    path: '/billing',
  },
  {
    name: 'Settings',
    icon: Settings,
    path: '/settings',
  }
];

export const InterviewType = [
  {
    title: 'Technical',
    icon: Code2Icon
  },
  {
    title: 'Behavioural',
    icon: User2Icon
  },
  {
    title: 'Experience',
    icon: BriefcaseBusinessIcon
  },
  {
    title: 'Problem Solving',
    icon: Puzzle
  },
  {
    title: 'Leadership',
    icon: Crown
  }
]


export const QUESTION_PROMPT = `
You are an expert technical interviewer with extensive experience in conducting interviews for various roles. Based on the following inputs, generate a well-structured, detailed, and time-optimized list of interview questions:

Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}} minutes
Interview Type: {{type}}

📋 Your Task:
1. **Analyze the Job Description**: 
   - Identify key responsibilities, required technical skills, and expected level of experience.
   - Extract both soft and hard skill requirements to formulate the questions.
   - Understand the depth of technical knowledge required, as well as the problem-solving abilities and decision-making processes expected.

2. **Generate Relevant Interview Questions**:
   - Tailor the questions based on the **interview duration** (e.g., for a 30-minute interview, focus on more concise but impactful questions; for a 60-minute interview, consider exploring a broader range of topics).
   - Adjust the **number and depth** of questions to fit the interview type (Technical, Behavioral, Leadership, Problem-solving, etc.).
   - Ensure that the questions test the candidate's understanding of **core concepts**, as well as **practical experience** in solving real-world problems related to the job description.
   
3. **Ensure the Interview Matches the Interview Type**:
   - For **Technical interviews**, focus on **problem-solving, algorithmic thinking, coding, and system design**.
   - For **Behavioral interviews**, focus on **situational and competency-based questions** that explore the candidate’s soft skills, cultural fit, and past work experience.
   - For **Leadership roles**, incorporate questions around **leadership experience, team management, and decision-making**.
   - For **Problem-Solving interviews**, prioritize real-life case studies or hypothetical scenarios.

4. **Focus on Communication**:
   - Make sure that the questions encourage the candidate to explain their thought process and approach clearly.
   - Include questions that assess **communication skills** and how well the candidate conveys complex ideas.

5. **Format the Response in JSON**:
   - Your response should be a structured JSON format with an **array** of questions.
   - Each question should include:
     - \`question\`: The text of the interview question.
     - \`type\`: The category of the question (e.g., Technical, Behavioral, Leadership, Problem-solving, etc.)
     - \`difficulty\`: The difficulty level of the question (e.g., Easy, Medium, Hard).
     - \`followUp\`: Optional, any follow-up question related to the main question to probe deeper.

Sample out put format:
{
  "interviewQuestions": [
    {
      "question": "What are the core principles of object-oriented programming (OOP), and how would you implement these principles in a software design?",
      "type": "Technical",
      "difficulty": "Medium",
      "followUp": "Can you give an example of how you've applied these principles in a real project?"
    },
    {
      "question": "Tell me about a time when you had to manage a conflict between two team members. How did you handle the situation?",
      "type": "Behavioral",
      "difficulty": "Medium",
      "followUp": "What was the outcome, and would you do anything differently next time?"
    },
    {
      "question": "If you're given a system with millions of users, how would you design a highly available and scalable architecture?",
      "type": "Technical",
      "difficulty": "Hard",
      "followUp": "What are the trade-offs you would consider when choosing between different architectures?"
    },
    {
      "question": "Describe a situation where you had to prioritize between competing deadlines or projects. How did you decide which to focus on?",
      "type": "Leadership",
      "difficulty": "Medium",
      "followUp": "How did you communicate your decision to the team?"
    }
  ]
}

🎯 **Goal**: Create a structured, time-optimized, and relevant interview plan tailored specifically for a {{jobTitle}} role. 
Make sure the questions assess both technical depth and soft skills, ensuring a balanced and comprehensive evaluation of the candidate's capabilities. Provide a clear and concise set of questions while adhering to the interview duration.
`;


export const FEEDBACK_PROMPT = `
{{conversation}}
Depends on this interview Conversation between assistant and user, Give me feedback for user interview. Give me rating out of 10 for technical skills, Communication, Problem Solving, Experience. Also give me summary in 3 lines about the interview and one line to let me know whether is recommended for hire or not with msg. Give me response in JSON format
{
	feedback:{
		rating:{
			technicalSkills:5
			communication:6
			problemSolving:4
			experience:3
		},
		summary:<in 3 lines>
		Recommendation:" ",
		RecommendationMsg:" "
	}
}
`