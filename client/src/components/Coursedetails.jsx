
import React, { useState } from "react"
import { FaUser, FaClock, FaStar } from "react-icons/fa"
import { useTranslation } from "react-i18next"

export default function CourseDetail() {
  const { t } = useTranslation()
  // Fetch course arrays from translation JSON
  const topCourses = t("courseDetail.courses.top", { returnObjects: true }) || []
  const moreCourses = t("courseDetail.courses.more", { returnObjects: true }) || []
  const testimonials = t("courseDetail.testimonials.reviews", { returnObjects: true }) || []

  const [modalCourse, setModalCourse] = useState(null)
  const openModal = (course) => setModalCourse(course)
  const closeModal = () => setModalCourse(null)
  const handleWatchNow = (e) => {
    e?.stopPropagation?.()
    window.location.href = "https://www.youtube.com/embed/JIKf55ZBPes?si=3WSSi0REj7YCKgj6"
  }

  const [showAll, setShowAll] = useState(false)
  const displayedCourses = showAll ? moreCourses : moreCourses.slice(0, 2) // Only 3 sample entries, so show max 2 unless "ਹੋਰ ਵੇਖੋ"

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [formStatus, setFormStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:5000/api/doubts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })
      if (res.ok) {
        setFormStatus("success")
        setName("")
        setEmail("")
        setMessage("")
      } else {
        setFormStatus("error")
      }
    } catch {
      setFormStatus("error")
    }
  }

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative h-[360px] bg-cover bg-center flex items-center justify-start px-6 lg:px-20"
        style={{ backgroundImage: "url('/Hero.png')" }}
      >
        <div className="relative z-10 w-full lg:w-1/2 text-left text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("courseDetail.heroTitle")}</h2>
          <p className="max-w-md text-lg opacity-90">{t("courseDetail.heroSubtitle")}</p>
        </div>
      </section>

      {/* Top 3 Practical AI Course Recordings */}
      <section className="container mx-auto px-6 lg:px-20 py-12">
        <h3 className="text-2xl font-semibold mb-6 text-[#44425A]">{t("courseDetail.practicalAI")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {topCourses.map(({ classLabel, title, description }, idx) => (
            <div
              key={idx}
              className="hover:shadow-lg transition-[50%] cursor-pointer bg-white hover:border-grey-500 border border-gray-300 rounded-[20px] hover:brightness-70 flex flex-col overflow-hidden"
            >
              <div className="p-6 flex-grow">
                <span className="inline-block text-xs text-[#6C6A74] bg-[#EBEAEF] px-3 py-1 rounded-full mb-4">
                  {classLabel}
                </span>
                <h4 className="text-lg font-bold mb-2 text-[#44425A]">{title}</h4>
                <p className="text-sm text-[#6C6A74] leading-relaxed">{description}</p>
              </div>
              <button
                onClick={handleWatchNow}
                className="mx-4 mb-4 py-3 text-center text-white bg-[#FF6600] font-semibold rounded-full hover:brightness-90 transition"
              >
                {t("courseDetail.watchNow")} &rarr;
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* More Courses Grid */}
      <section className="container mx-auto px-6 lg:px-20 py-12 rounded-t-3xl">
        <h3 className="text-2xl font-semibold mb-6 text-[#44425A]">{t("courseDetail.moreCourses")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCourses.map((course, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-300 rounded-[20px] overflow-hidden hover:shadow-lg transition cursor-pointer"
              onClick={() => openModal(course)}
            >
              <img src={course.img || "/placeholder.svg"} alt={course.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <div className="flex items-center text-sm text-[#6C6A74] mb-2 space-x-2">
                  <FaUser className="text-[#FF6600]" />
                  <span>{course.students}</span>
                  <FaClock className="ml-4 text-[#FF6600]" />
                  <span>{course.duration}</span>
                </div>
                <h4 className="text-lg font-semibold mb-2 text-[#44425A]">{course.title}</h4>
                <hr className="border-gray-200 mb-2" />
                <div className="flex items-center mb-4">
                  <FaStar className="text-[#FF6600] mr-1" />
                  <span className="text-sm text-[#6C6A74]">{course.rating}</span>
                </div>
                <div className="flex justify-between items-center"></div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleWatchNow(e); }}
                  className="bg-[#FF6600] text-white text-sm font-semibold rounded-full px-4 py-2 hover:brightness-90 transition mt-2"
                >
                  {t("courseDetail.watchNow")}
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Explore More/Less Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 bg-[#FF6600] text-white font-semibold rounded-full hover:brightness-90 transition"
          >
            {showAll ? t("courseDetail.exploreLess") : t("courseDetail.exploreMore")}
          </button>
        </div>
        {/* Modal Dialog */}
        {modalCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
              <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" aria-label="close modal">
                &times;
              </button>
              <h3 className="text-xl font-bold mb-2 text-[#44425A]">
                {t("courseDetail.aboutModule")} {modalCourse.title}
              </h3>
              <p className="text-sm text-[#6C6A74] mb-2">
                <strong>{t("courseDetail.sessionDate")}</strong> {modalCourse.date}
              </p>
              <p className="text-sm text-[#6C6A74] mb-2">
                <strong>{t("courseDetail.instructor")}</strong> ਡਾ. ਸੰਦੀਪ ਸਿੰਘ ਸੰਧਾ (UCLA, IIT Roorkee)
              </p>
              <p className="text-sm text-[#6C6A74] mb-2">
                <strong>{t("courseDetail.keyTakeaways")}</strong> AI ਸਿਹਤ, ਖੇਤੀ ਅਤੇ ਜੀਵ ਜੰਤੂਆਂ ਵਿੱਚ ਵਰਤੋਂ। Python ਨਾਲ ਹੱਥ-ਵਿਖਾਈ ਪ੍ਰਾਜੈਕਟ।
              </p>
              <p className="text-sm text-[#6C6A74] mb-4">
                <strong>{t("courseDetail.whoJoined")}</strong> 200+ ਸ਼ਹਿਰਾਂ ਤੋਂ ਵਿਦਿਆਰਥੀਆਂ ਨੇ ਭਾਗ ਲਿਆ।
              </p>
              <button
                onClick={handleWatchNow}
                className="w-full py-2 bg-[#FF6600] text-white font-semibold rounded-full hover:brightness-90 transition"
              >
                {t("courseDetail.watchNow")} &rarr;
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto px-6 lg:px-20 pt-12 pb-12 bg-[#EBEAEF]">
        <h3 className="text-2xl font-semibold mb-2 text-center text-[#44425A]">
          {t("courseDetail.contactForm.title")}
        </h3>
        <p className="text-center text-sm mb-6 text-[#6C6A74]">{t("courseDetail.contactForm.subtitle")}</p>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
          <input
            type="text"
            placeholder={t("courseDetail.contactForm.namePlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-[#6C6A74] rounded-full focus:outline-none placeholder-[#6C6A74] text-[#6C6A74]"
            required
            aria-label={t("courseDetail.contactForm.namePlaceholder")}
          />
          <input
            type="email"
            placeholder={t("courseDetail.contactForm.emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-[#6C6A74] rounded-full focus:outline-none placeholder-[#6C6A74] text-[#6C6A74]"
            required
            aria-label={t("courseDetail.contactForm.emailPlaceholder")}
          />
          <textarea
            rows="4"
            placeholder={t("courseDetail.contactForm.queryPlaceholder")}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 border border-[#6C6A74] rounded-[20px] focus:outline-none placeholder-[#6C6A74] text-[#6C6A74]"
            required
            aria-label={t("courseDetail.contactForm.queryPlaceholder")}
          />
          <button
            type="submit"
            className="w-full px-4 py-3 rounded-full bg-[#FF6600] text-white font-semibold hover:brightness-90 transition"
          >
            {t("courseDetail.contactForm.submit")}
          </button>
          {formStatus === "success" && (
            <p className="text-green-600 text-center font-medium pt-2">{t("courseDetail.contactForm.success")}</p>
          )}
          {formStatus === "error" && (
            <p className="text-red-600 text-center font-medium pt-2">{t("courseDetail.contactForm.error")}</p>
          )}
        </form>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6 lg:px-20 py-12 bg-white">
        <h3 className="text-3xl font-semibold text-[#44425A] text-center mb-8">
          {t("courseDetail.testimonials.title")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center text-center px-4">
              <div className="h-32 w-32 mb-4">
                <img
                  src={`/Images/student${index + 1}.png`}
                  alt={`${testimonial.name} photo`}
                  className="h-full w-full object-cover rounded-full transform transition duration-300 ease-in-out hover:scale-110"
                />
              </div>
              <p className="text-[#6C6A74] text-sm italic">
                <span className="text-[#FF6600]">"</span>
                {testimonial.text}
                <span className="text-[#FF6600]">"</span>
              </p>
              <h5 className="mt-3 font-medium text-[#6C6A74]">{testimonial.name}</h5>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

