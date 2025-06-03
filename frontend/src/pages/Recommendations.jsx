"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import "./css/Recommendations.css"
import { jwtDecode } from "jwt-decode"

const Recommendations = () => {
  const [userId, setUserID] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skinType: "",
    issues: "",
    userId: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // Clear message when user starts typing
    if (message.text) {
      setMessage({ type: "", text: "" })
    }
  }

  const getUserIdFromToken = (token) => {
    if (!token) return null
    try {
      const decoded = jwtDecode(token)
      return decoded.user.id
    } catch (error) {
      console.error("Invalid token:", error)
      return null
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("auth-token")
    const userId = getUserIdFromToken(token)
    setUserID(userId)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const submissionData = { ...formData, userId }
      await axios.post("http://localhost:4000/createrequest", submissionData)

      setMessage({
        type: "success",
        text: "Request submitted successfully! Our admin will review your request and get back to you soon.",
      })

      setFormData({ name: "", email: "", skinType: "", issues: "", userId: "" })

      // Clear success message after 5 seconds
      setTimeout(() => {
        setMessage({ type: "", text: "" })
      }, 5000)
    } catch (err) {
      console.error("Submission error:", err)
      setMessage({
        type: "error",
        text: "Failed to submit request. Please try again later.",
      })

      // Clear error message after 5 seconds
      setTimeout(() => {
        setMessage({ type: "", text: "" })
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="user-request-form-container">
      <h2>Request Admin To Recommend A Product</h2>

      {message.text && <div className={`${message.type}-message`}>{message.text}</div>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Full Name"
          required
          disabled={isSubmitting}
        />

        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email Address"
          required
          disabled={isSubmitting}
        />

        <input
          name="skinType"
          value={formData.skinType}
          onChange={handleChange}
          placeholder="Your Skin Type (e.g., Oily, Dry, Combination, Sensitive)"
          required
          disabled={isSubmitting}
        />

        <textarea
          name="issues"
          value={formData.issues}
          onChange={handleChange}
          placeholder="Describe your skin concerns and what you're looking for in detail..."
          required
          disabled={isSubmitting}
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  )
}

export default Recommendations
