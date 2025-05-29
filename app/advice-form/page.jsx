// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import LanguageToggle from "../components/LanguageToggle";

// export default function AdviceForm() {
//   const [formData, setFormData] = useState({
//     animalType: "goat",
//     age: "",
//     weight: "",
//     healthIssues: "",
//     feedingHabits: "normal",
//   });
//   const [language, setLanguage] = useState("en");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const router = useRouter();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await fetch("/api/advice", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...formData,
//           language,
//         }),
//       });

//       const result = await response.json();
//       router.push(`/advice-result?id=${result.id}`);
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const translations = {
//     en: {
//       title: "Animal Care Advice Form",
//       animalType: "Animal Type",
//       age: "Age (months)",
//       weight: "Weight (kg)",
//       feedingHabits: "Current Feeding Habits",
//       healthIssues: "Any Health Issues (if any)",
//       submit: "Get Custom Advice",
//     },
//     ur: {
//       title: "Janwar ki Hifazat ka Mashwara Form",
//       animalType: "Janwar ki Qisam",
//       age: "Umar (mahine)",
//       weight: "Wazan (kg)",
//       feedingHabits: "Filhaal Khurak ka Andaaz",
//       healthIssues: "Koi Sehat ke Masail (agar hain)",
//       submit: "Apna Mashwara Hasil Karen",
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
//       <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
//         <div className="bg-green-700 text-white p-6">
//           <h1 className="text-2xl font-bold">{translations[language].title}</h1>
//         </div>

//         <div className="p-6">
//           <LanguageToggle language={language} setLanguage={setLanguage} />

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   {translations[language].animalType}
//                 </label>
//                 <select
//                   name="animalType"
//                   value={formData.animalType}
//                   onChange={handleChange}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                   required
//                 >
//                   <option value="goat">Goat / Bakri</option>
//                   <option value="sheep">Sheep / Dumbi</option>
//                   <option value="cow">Cow / Gaay</option>
//                   <option value="camel">Camel / Oont</option>
//                 </select>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     {translations[language].age}
//                   </label>
//                   <input
//                     type="number"
//                     name="age"
//                     value={formData.age}
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     {translations[language].weight}
//                   </label>
//                   <input
//                     type="number"
//                     name="weight"
//                     value={formData.weight}
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   {translations[language].feedingHabits}
//                 </label>
//                 <select
//                   name="feedingHabits"
//                   value={formData.feedingHabits}
//                   onChange={handleChange}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                 >
//                   <option value="normal">Normal / Mamooli</option>
//                   <option value="reduced">Reduced / Kam</option>
//                   <option value="increased">Increased / Zyada</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   {translations[language].healthIssues}
//                 </label>
//                 <textarea
//                   name="healthIssues"
//                   value={formData.healthIssues}
//                   onChange={handleChange}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                   rows="3"
//                   placeholder={
//                     language === "ur"
//                       ? "Masail ka tafseel se zikr karen"
//                       : "Describe any issues in detail"
//                   }
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition-all disabled:opacity-70 flex justify-center items-center"
//             >
//               {isSubmitting ? (
//                 <>
//                   <svg
//                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   {language === "ur" ? "Processing..." : "Processing..."}
//                 </>
//               ) : (
//                 translations[language].submit
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LanguageToggle from "../components/LanguageToggle";
import BackButton from "../components/BackButton";
import { motion } from "framer-motion";

export default function AdviceForm() {
  const [formData, setFormData] = useState({
    animalType: "goat",
    age: "",
    weight: "",
    healthIssues: "",
    feedingHabits: "normal",
  });
  const [language, setLanguage] = useState("en");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/advice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          language,
        }),
      });

      const result = await response.json();
      router.push(`/advice-result?id=${result.id}`);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const translations = {
    en: {
      title: "Animal Care Advice Form",
      animalType: "Animal Type",
      age: "Age (months)",
      weight: "Weight (kg)",
      feedingHabits: "Current Feeding Habits",
      healthIssues: "Any Health Issues (if any)",
      submit: "Get Custom Advice",
    },
    ur: {
      title: "Janwar ki Hifazat ka Mashwara Form",
      animalType: "Janwar ki Qisam",
      age: "Umar (mahine)",
      weight: "Wazan (kg)",
      feedingHabits: "Filhaal Khurak ka Andaaz",
      healthIssues: "Koi Sehat ke Masail (agar hain)",
      submit: "Apna Mashwara Hasil Karen",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <BackButton />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-green-500 to-green-400 text-white p-6">
            <h1 className="text-2xl font-bold">
              {translations[language].title}
            </h1>
          </div>

          <div className="p-6">
            <LanguageToggle language={language} setLanguage={setLanguage} />

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {translations[language].animalType}
                  </label>
                  <select
                    name="animalType"
                    value={formData.animalType}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="goat">Goat / Bakri</option>
                    <option value="sheep">Sheep / Dumbi</option>
                    <option value="cow">Cow / Gaay</option>
                    <option value="camel">Camel / Oont</option>
                  </select>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {translations[language].age}
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {translations[language].weight}
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {translations[language].feedingHabits}
                  </label>
                  <select
                    name="feedingHabits"
                    value={formData.feedingHabits}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="normal">Normal / Mamooli</option>
                    <option value="reduced">Reduced / Kam</option>
                    <option value="increased">Increased / Zyada</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {translations[language].healthIssues}
                  </label>
                  <textarea
                    name="healthIssues"
                    value={formData.healthIssues}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    rows="3"
                    placeholder={
                      language === "ur"
                        ? "Masail ka tafseel se zikr karen"
                        : "Describe any issues in detail"
                    }
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white font-medium py-3 px-4 rounded-lg shadow-md transition-all disabled:opacity-70 flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {language === "ur" ? "Processing..." : "Processing..."}
                    </>
                  ) : (
                    translations[language].submit
                  )}
                </button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
