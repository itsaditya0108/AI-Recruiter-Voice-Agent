import React from 'react';
import { Home, ArrowRight } from 'lucide-react';

const InterviewComplete = () => {
    return (
        <div className="bg-midnight text-white font-sans flex flex-col min-h-screen">

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center space-y-8 py-16">

                {/* Success Icon */}
                <div className="rounded-full bg-seaGreen p-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                {/* Heading */}
                <h1 className="text-4xl font-bold text-center">Interview Complete!</h1>

                {/* Subheading */}
                <p className="text-lg text-gray-300 text-center">
                    Thank you for participating in the AI-driven interview with Alcruiter
                </p>

                {/* Image */}
                <div className="rounded-xl overflow-hidden shadow-lg">
                    <img
                        src="/interviewCompleted.jpg"
                        alt="Interview Illustration"
                        className="w-full h-auto object-cover max-w-4xl"
                        style={{
                            width: '800px',
                            height: '400px',
                        }}
                    />
                </div>

                {/* Next Steps */}
                <div className="bg-midnightLighter rounded-xl p-8 shadow-md w-full max-w-xl space-y-4">
                    <div className="flex items-center justify-center rounded-full bg-midnightLightest w-12 h-12 mx-auto">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-electricBlue"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 19l9-2-9-2-9 2 9 2zm0-10l9-2-9-2-9 2 9 2z"
                            />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-semibold text-center">What’s Next?</h2>
                    <p className="text-gray-300 text-center">
                        The recruiter will review your interview responses and will contact you soon regarding the next steps.
                    </p>

                    <p className="text-gray-400 text-sm text-center flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 inline-block mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4m0 4h.01M12 4a8 8 0 100 16 8 8 0 000-16z"
                            />
                        </svg>
                        Response within 2–3 business days
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex space-x-4">
                    <button className="bg-midnightLightest text-gray-300 hover:text-white rounded-lg py-3 px-6 flex items-center space-x-2 transition duration-300 ease-in-out">
                        <Home className="h-5 w-5" />
                        <span>Return to Homepage</span>
                    </button>

                    <button className="bg-electricBlue hover:bg-electricBlueDark text-white rounded-lg py-3 px-6 flex items-center space-x-2 transition duration-300 ease-in-out">
                        <ArrowRight className="h-5 w-5" />
                        <span>View Other Opportunities</span>
                    </button>
                </div>

            </main>

            {/* Footer */}
            <footer className="bg-midnightLighter text-gray-400 text-center py-4">
                <p>&copy; 2025 Alcruiter. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default InterviewComplete;
