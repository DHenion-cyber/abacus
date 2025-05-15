"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Target, 
  Users, 
  DollarSign, 
  ShieldAlert, 
  Lightbulb, 
  Briefcase, 
  Rocket 
} from "lucide-react";
import { FormData } from "@/lib/types";

interface IntakeFormProps {
  onSubmit: (data: FormData) => void;
}

const IntakeForm = ({ onSubmit }: IntakeFormProps) => {
  const initialFormData: FormData = {
    problemStatement: "",
    targetAudience: [],
    targetAudienceOther: "",
    valueProposition: "",
    revenueModel: [],
    revenueModelOther: "",
    riskConcerns: "",
    innovationLevel: ""
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [charCounts, setCharCounts] = useState({
    problemStatement: 0,
    valueProposition: 0,
    riskConcerns: 0,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Animation refs
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref4, inView4] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref5, inView5] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref6, inView6] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref7, inView7] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Check for mobile screen size on client side only
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Target audience options
  const targetAudienceOptions = [
    "Enterprise businesses",
    "Small to medium businesses",
    "Consumers - general",
    "Consumers - specific demographic",
    "Government/public sector",
    "Educational institutions",
    "Healthcare providers",
    "Other (please specify)"
  ];

  // Revenue model options
  const revenueModelOptions = [
    "Subscription-based",
    "One-time purchase",
    "Freemium",
    "Usage-based pricing",
    "Advertising",
    "Marketplace/commission",
    "Other (please specify)"
  ];

  // Innovation level options
  const innovationLevelOptions = [
    "Incremental improvement to existing solution",
    "Significant enhancement to existing solution",
    "New solution for established market",
    "Disruptive innovation for new market",
    "Breakthrough technology/approach"
  ];

  // Handle text input changes
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Update character count for text areas
    if (name === "problemStatement" || name === "valueProposition" || name === "riskConcerns") {
      setCharCounts(prev => ({
        ...prev,
        [name]: value.length
      }));
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, option: string) => {
    const { checked } = e.target;
    const fieldName = e.target.name as "targetAudience" | "revenueModel";
    
    setFormData(prev => {
      const currentOptions = [...prev[fieldName]];
      
      if (checked) {
        if (!currentOptions.includes(option)) {
          currentOptions.push(option);
        }
      } else {
        const index = currentOptions.indexOf(option);
        if (index !== -1) {
          currentOptions.splice(index, 1);
        }
      }
      
      return {
        ...prev,
        [fieldName]: currentOptions
      };
    });
    
    // Clear error for this field if it exists
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  // Handle radio button changes
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate form
  useEffect(() => {
    const newErrors: Record<string, string> = {};
    
    // Check if at least one target audience is selected
    if (formData.targetAudience.length === 0) {
      newErrors.targetAudience = "Please select at least one target audience";
    }
    
    // Check if "Other" is selected but no text is provided
    if (
      formData.targetAudience.includes("Other (please specify)") && 
      !formData.targetAudienceOther.trim()
    ) {
      newErrors.targetAudienceOther = "Please specify other target audience";
    }
    
    // Check if at least one revenue model is selected
    if (formData.revenueModel.length === 0) {
      newErrors.revenueModel = "Please select at least one revenue model";
    }
    
    // Check if "Other" is selected but no text is provided
    if (
      formData.revenueModel.includes("Other (please specify)") && 
      !formData.revenueModelOther.trim()
    ) {
      newErrors.revenueModelOther = "Please specify other revenue model";
    }
    
    // Check if innovation level is selected
    if (!formData.innovationLevel) {
      newErrors.innovationLevel = "Please select an innovation level";
    }
    
    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [formData]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Process form data for submission
    const processedData = { ...formData };
    
    // If "Other" is not selected, clear the "Other" text fields
    if (!processedData.targetAudience.includes("Other (please specify)")) {
      processedData.targetAudienceOther = "";
    }
    
    if (!processedData.revenueModel.includes("Other (please specify)")) {
      processedData.revenueModelOther = "";
    }
    
    // Submit the form data
    onSubmit(processedData);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Question 1: Problem Statement */}
      <motion.div
        ref={ref1}
        className="form-card"
        variants={cardVariants}
        initial="hidden"
        animate={inView1 ? "visible" : "hidden"}
      >
        <div className="flex items-start mb-4">
          <Target className="text-[#0066CC] h-6 w-6 mr-3 mt-1" />
          <div>
            <label htmlFor="problemStatement" className="form-label">
              What problem are you trying to solve?
            </label>
            <p className="text-[#1A1A1A] opacity-70 mb-3">
              Describe the problem, pain point, or opportunity you've identified.
            </p>
          </div>
        </div>
        <textarea
          id="problemStatement"
          name="problemStatement"
          value={formData.problemStatement}
          onChange={handleTextChange}
          className="form-textarea"
          placeholder="e.g., Small businesses struggle to manage customer relationships efficiently without expensive CRM software..."
          maxLength={500}
          aria-describedby="problemStatement-desc"
        />
        <div className="character-count">
          {charCounts.problemStatement}/500 characters
        </div>
        <div id="problemStatement-desc" className="sr-only">
          Describe the problem, pain point, or opportunity you've identified. Maximum 500 characters.
        </div>
      </motion.div>

      {/* Question 2: Target Audience */}
      <motion.div
        ref={ref2}
        className="form-card"
        variants={cardVariants}
        initial="hidden"
        animate={inView2 ? "visible" : "hidden"}
      >
        <div className="flex items-start mb-4">
          <Users className="text-[#0066CC] h-6 w-6 mr-3 mt-1" />
          <div>
            <label className="form-label">Who is your target audience?</label>
            <p className="text-[#1A1A1A] opacity-70 mb-3">
              Select all that apply.
            </p>
          </div>
        </div>
        <div className="space-y-2">
          {targetAudienceOptions.map((option) => (
            <div key={option} className="form-checkbox-container">
              <input
                type="checkbox"
                id={`targetAudience-${option}`}
                name="targetAudience"
                checked={formData.targetAudience.includes(option)}
                onChange={(e) => handleCheckboxChange(e, option)}
                className="form-checkbox"
                aria-describedby={`targetAudience-${option}-desc`}
              />
              <label
                htmlFor={`targetAudience-${option}`}
                className="form-checkbox-label"
              >
                {option}
              </label>
              <div id={`targetAudience-${option}-desc`} className="sr-only">
                Select if your target audience includes {option}
              </div>
            </div>
          ))}
        </div>
        {formData.targetAudience.includes("Other (please specify)") && (
          <div className="mt-3">
            <input
              type="text"
              id="targetAudienceOther"
              name="targetAudienceOther"
              value={formData.targetAudienceOther}
              onChange={handleTextChange}
              className="custom-input"
              placeholder="Please specify other target audience"
              aria-describedby="targetAudienceOther-desc"
            />
            <div id="targetAudienceOther-desc" className="sr-only">
              Specify your other target audience
            </div>
            {errors.targetAudienceOther && (
              <div className="error-message">{errors.targetAudienceOther}</div>
            )}
          </div>
        )}
        {errors.targetAudience && (
          <div className="error-message">{errors.targetAudience}</div>
        )}
      </motion.div>

      {/* Question 3: Value Proposition */}
      <motion.div
        ref={ref3}
        className="form-card"
        variants={cardVariants}
        initial="hidden"
        animate={inView3 ? "visible" : "hidden"}
      >
        <div className="flex items-start mb-4">
          <Lightbulb className="text-[#0066CC] h-6 w-6 mr-3 mt-1" />
          <div>
            <label htmlFor="valueProposition" className="form-label">
              What is your initial value proposition?
            </label>
            <p className="text-[#1A1A1A] opacity-70 mb-3">
              Describe how your idea creates value for your target audience.
            </p>
          </div>
        </div>
        <textarea
          id="valueProposition"
          name="valueProposition"
          value={formData.valueProposition}
          onChange={handleTextChange}
          className="form-textarea"
          placeholder="e.g., Our solution provides small businesses with an affordable, easy-to-use CRM that integrates with their existing tools..."
          maxLength={500}
          aria-describedby="valueProposition-desc"
        />
        <div className="character-count">
          {charCounts.valueProposition}/500 characters
        </div>
        <div id="valueProposition-desc" className="sr-only">
          Describe how your idea creates value for your target audience. Maximum 500 characters.
        </div>
      </motion.div>

      {/* Question 4: Revenue Model */}
      <motion.div
        ref={ref4}
        className="form-card"
        variants={cardVariants}
        initial="hidden"
        animate={inView4 ? "visible" : "hidden"}
      >
        <div className="flex items-start mb-4">
          <DollarSign className="text-[#0066CC] h-6 w-6 mr-3 mt-1" />
          <div>
            <label className="form-label">
              What revenue model(s) are you considering?
            </label>
            <p className="text-[#1A1A1A] opacity-70 mb-3">
              Select all that apply.
            </p>
          </div>
        </div>
        <div className="space-y-2">
          {revenueModelOptions.map((option) => (
            <div key={option} className="form-checkbox-container">
              <input
                type="checkbox"
                id={`revenueModel-${option}`}
                name="revenueModel"
                checked={formData.revenueModel.includes(option)}
                onChange={(e) => handleCheckboxChange(e, option)}
                className="form-checkbox"
                aria-describedby={`revenueModel-${option}-desc`}
              />
              <label
                htmlFor={`revenueModel-${option}`}
                className="form-checkbox-label"
              >
                {option}
              </label>
              <div id={`revenueModel-${option}-desc`} className="sr-only">
                Select if you're considering {option} revenue model
              </div>
            </div>
          ))}
        </div>
        {formData.revenueModel.includes("Other (please specify)") && (
          <div className="mt-3">
            <input
              type="text"
              id="revenueModelOther"
              name="revenueModelOther"
              value={formData.revenueModelOther}
              onChange={handleTextChange}
              className="custom-input"
              placeholder="Please specify other revenue model"
              aria-describedby="revenueModelOther-desc"
            />
            <div id="revenueModelOther-desc" className="sr-only">
              Specify your other revenue model
            </div>
            {errors.revenueModelOther && (
              <div className="error-message">{errors.revenueModelOther}</div>
            )}
          </div>
        )}
        {errors.revenueModel && (
          <div className="error-message">{errors.revenueModel}</div>
        )}
      </motion.div>

      {/* Question 5: Risk Concerns */}
      <motion.div
        ref={ref5}
        className="form-card"
        variants={cardVariants}
        initial="hidden"
        animate={inView5 ? "visible" : "hidden"}
      >
        <div className="flex items-start mb-4">
          <ShieldAlert className="text-[#0066CC] h-6 w-6 mr-3 mt-1" />
          <div>
            <label htmlFor="riskConcerns" className="form-label">
              What risks or concerns do you have about this idea?
            </label>
            <p className="text-[#1A1A1A] opacity-70 mb-3">
              Describe any potential challenges, risks, or concerns you foresee.
            </p>
          </div>
        </div>
        <textarea
          id="riskConcerns"
          name="riskConcerns"
          value={formData.riskConcerns}
          onChange={handleTextChange}
          className="form-textarea"
          placeholder="e.g., Market is crowded with established competitors, potential regulatory challenges in certain regions..."
          maxLength={500}
          aria-describedby="riskConcerns-desc"
        />
        <div className="character-count">
          {charCounts.riskConcerns}/500 characters
        </div>
        <div id="riskConcerns-desc" className="sr-only">
          Describe any potential challenges, risks, or concerns you foresee. Maximum 500 characters.
        </div>
      </motion.div>

      {/* Question 6: Industry/Domain */}
      <motion.div
        ref={ref6}
        className="form-card"
        variants={cardVariants}
        initial="hidden"
        animate={inView6 ? "visible" : "hidden"}
      >
        <div className="flex items-start mb-4">
          <Briefcase className="text-[#0066CC] h-6 w-6 mr-3 mt-1" />
          <div>
            <label htmlFor="industryDomain" className="form-label">
              What industry or domain is your idea focused on?
            </label>
            <p className="text-[#1A1A1A] opacity-70 mb-3">
              Specify the primary industry or domain for your idea.
            </p>
          </div>
        </div>
        <input
          type="text"
          id="industryDomain"
          name="industryDomain"
          value={formData.industryDomain || ""}
          onChange={handleTextChange}
          className="form-input"
          placeholder="e.g., Healthcare, Finance, Education, Retail, etc."
          aria-describedby="industryDomain-desc"
        />
        <div id="industryDomain-desc" className="sr-only">
          Specify the primary industry or domain for your idea
        </div>
      </motion.div>

      {/* Question 7: Innovation Level */}
      <motion.div
        ref={ref7}
        className="form-card"
        variants={cardVariants}
        initial="hidden"
        animate={inView7 ? "visible" : "hidden"}
      >
        <div className="flex items-start mb-4">
          <Rocket className="text-[#0066CC] h-6 w-6 mr-3 mt-1" />
          <div>
            <label className="form-label">
              How would you characterize the level of innovation?
            </label>
            <p className="text-[#1A1A1A] opacity-70 mb-3">
              Select the option that best describes your innovation approach.
            </p>
          </div>
        </div>
        <div className="space-y-2">
          {innovationLevelOptions.map((option) => (
            <div key={option} className="form-radio-container">
              <input
                type="radio"
                id={`innovationLevel-${option}`}
                name="innovationLevel"
                value={option}
                checked={formData.innovationLevel === option}
                onChange={handleRadioChange}
                className="form-radio"
                aria-describedby={`innovationLevel-${option}-desc`}
              />
              <label
                htmlFor={`innovationLevel-${option}`}
                className="form-radio-label"
              >
                {option}
              </label>
              <div id={`innovationLevel-${option}-desc`} className="sr-only">
                Select if your innovation level is {option}
              </div>
            </div>
          ))}
        </div>
        {errors.innovationLevel && (
          <div className="error-message">{errors.innovationLevel}</div>
        )}
      </motion.div>

      {/* Submit Button */}
      <div className={`mt-8 ${isMobile ? "fixed-bottom-button" : ""}`}>
        <motion.button
          type="submit"
          className="form-button w-full"
          disabled={!isFormValid || isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Start Ideation
        </motion.button>
      </div>
    </form>
  );
};

export default IntakeForm;