import { useNavigate } from 'react-router-dom'

const ButtonToFlashcardSets = () => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/library')} 
      className="fixed top-20 left-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#1976D2] hover:bg-[#1565C0] text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-medium group"
    >
      <svg
        className="w-5 h-5 group-hover:translate-x-[-2px] transition-transform duration-200"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      Back
    </button>
  )
}

export default ButtonToFlashcardSets