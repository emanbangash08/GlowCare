import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Droplets,
  Shield,
  Sun,
  Sparkles,
  VenetianMaskIcon as Mask,
  SprayCanIcon as Spray,
  Eye,
  Baby,
  Moon,
  Heart,
  X,
  Menu,
} from "lucide-react"
import "./CategoryOverlay.css"

const categories = [
  { name: "Cleansers", path: "cleansers", icon: Droplets, color: "#3B82F6" },
  { name: "Moisturizers", path: "moisturizers", icon: Shield, color: "#10B981" },
  { name: "Sunscreens", path: "sunscreens", icon: Sun, color: "#F59E0B" },
  { name: "Serums & Treatments", path: "serums-treatments", icon: Sparkles, color: "#8B5CF6" },
  { name: "Face Masks & Scrubs", path: "face-masks-scrubs", icon: Mask, color: "#EC4899" },
  { name: "Toners & Mists", path: "toners-mists", icon: Spray, color: "#06B6D4" },
  { name: "Lip & Eye Care", path: "lip-eye-care", icon: Eye, color: "#EF4444" },
  { name: "Sensitive & Baby Skin", path: "sensitive-baby-skin", icon: Baby, color: "#84CC16" },
  { name: "Night Care", path: "night-care", icon: Moon, color: "#6366F1" },
  { name: "Body Care", path: "body-care", icon: Heart, color: "#F97316" },
]

const CategoryOverlay = ({ isOpen, onClose }) => {
  const location = useLocation()

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="category-overlay" onClick={onClose}>
      <div className="category-overlay-content" onClick={(e) => e.stopPropagation()}>
        <div className="overlay-header">
          <div className="overlay-title-section">
            <h1 className="overlay-title">Skincare Categories</h1>
            <p className="overlay-subtitle">Discover your perfect skincare routine</p>
          </div>
          <button className="overlay-close-btn" onClick={onClose} aria-label="Close categories">
            <X size={24} />
          </button>
        </div>

        <div className="categories-grid">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            const isActive = location.pathname === `/category/${category.path}`

            return (
              <Link
                key={index}
                to={`/category/${category.path}`}
                className={`category-card ${isActive ? "active" : ""}`}
                style={{ "--category-color": category.color }}
                onClick={onClose}
              >
                <div className="category-card-icon">
                  <IconComponent size={32} />
                </div>
                <h3 className="category-card-title">{category.name}</h3>
                <div className="category-card-arrow">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M7.5 5L12.5 10L7.5 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="overlay-footer">
          <div className="overlay-footer-content">
            <p className="overlay-footer-text">Need personalized recommendations?</p>
            <button className="overlay-footer-btn">Get Expert Advice</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const CategoryToggle = ({ onClick }) => {
  return (
    <button className="category-toggle-btn" onClick={onClick} aria-label="Open categories">
      <Menu size={24} />
      <span>Categories</span>
    </button>
  )
}

export default CategoryOverlay
