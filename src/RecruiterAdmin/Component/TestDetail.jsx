import { Info, X } from 'lucide-react';
import { useState } from 'react';

export default function TestDetail({ formData, onUpdate, onNext, onCancel, loading }) {
    const [newSkill, setNewSkill] = useState('');

    const addSkill = () => {
        if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
            const updatedSkills = [...formData.skills, newSkill.trim()];
            onUpdate({
                ...formData,
                skills: updatedSkills,
                skillLevels: [
                    ...formData.skillLevels,
                    { skill: newSkill.trim(), level: 'Any', mcq: 0, coding: 0, audio: 0, video: 0 }
                ]
            });
            setNewSkill('');
        }
    };

    const removeSkill = (skillToRemove) => {
        onUpdate({
            ...formData,
            skills: formData.skills.filter(s => s !== skillToRemove),
            skillLevels: formData.skillLevels.filter(sl => sl.skill !== skillToRemove)
        });
    };

    const updateSkillLevel = (skill, field, value) => {
        onUpdate({
            ...formData,
            skillLevels: formData.skillLevels.map(sl =>
                sl.skill === skill ? { ...sl, [field]: value } : sl
            )
        });
    };

    const getTotalQuestions = () => {
        return formData.skillLevels.reduce((sum, sl) => 
            sum + (sl.mcq || 0) + (sl.coding || 0) + (sl.audio || 0) + (sl.video || 0), 0
        );
    };

    return (
        <div className="">
            <div className="bg-[#DDEFFC] border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                <Info className="text-blue-600 mt-0.5" size={20} />
                <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Provide Role Information</h3>
                    <p className="text-sm text-gray-600">
                        Recruiters manage end-to-end hiring — from creating job descriptions to shortlisting candidates and managing assessments
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border-gray-300 p-4 sm:p-6 mb-6">
                <div className="mb-4 sm:mb-6">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                        Role Title
                    </label>
                    <input
                        type="text"
                        value={formData.roleTitle}
                        onChange={(e) => onUpdate({ ...formData, roleTitle: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., UI/UX Designer"
                    />
                </div>

                <div className="mb-4 sm:mb-6">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                        Skills
                    </label>
                    <div className="flex gap-1.5 sm:gap-2 mb-3 flex-wrap">
                        {formData.skills.map((skill) => (
                            <span key={skill} className="bg-blue-100 text-blue-700 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
                                {skill}
                                <button
                                    onClick={() => removeSkill(skill)}
                                    className="hover:bg-blue-200 rounded-full p-0.5"
                                >
                                    <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                            className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Add a skill"
                        />
                        <button
                            onClick={addSkill}
                            className="px-4 py-2 bg-blue-500 text-white text-sm sm:text-base rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Add
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="col-span-1">
                        <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                            Experience
                        </label>
                        <input
                            type="text"
                            value={formData.experience}
                            onChange={(e) => onUpdate({ ...formData, experience: e.target.value })}
                            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., 2 Years"
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                            Work Arrangement
                        </label>
                        <select
                            value={formData.workArrangement}
                            onChange={(e) => onUpdate({ ...formData, workArrangement: e.target.value })}
                            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        >
                            <option>Full Time</option>
                            <option>Part Time</option>
                            <option>Contract</option>
                            <option>Remote</option>
                        </select>
                    </div>
                    <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                        <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => onUpdate({ ...formData, location: e.target.value })}
                            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., Kolkata"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                        Compensation Range
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                        <select
                            value={formData.currency}
                            onChange={(e) => onUpdate({ ...formData, currency: e.target.value })}
                            className="px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        >
                            <option>INR</option>
                            <option>USD</option>
                            <option>EUR</option>
                            <option>GBP</option>
                        </select>
                        <input
                            type="text"
                            value={formData.minCompensation}
                            onChange={(e) => onUpdate({ ...formData, minCompensation: e.target.value })}
                            className="px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Min Amount"
                        />
                        <input
                            type="text"
                            value={formData.maxCompensation}
                            onChange={(e) => onUpdate({ ...formData, maxCompensation: e.target.value })}
                            className="px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Max Amount"
                        />
                    </div>
                </div>
            </div>

            {formData.skills.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 border border-gray-300">
                    <div className="border border-gray-300 shadow-md rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px]">
                                <thead className="bg-[#D9D9D978] rounded-t-xl">
                                    <tr>
                                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                                            Skills
                                        </th>
                                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                                            Level
                                        </th>
                                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                                            MCQ
                                        </th>
                                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                                            Coding
                                        </th>
                                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                                            Audio
                                        </th>
                                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">
                                            Video
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {formData.skillLevels.map((skillLevel) => (
                                        <tr key={skillLevel.skill}>
                                            <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-900 whitespace-nowrap">
                                                {skillLevel.skill}
                                            </td>
                                            <td className="px-3 sm:px-6 py-2 sm:py-4">
                                                <select
                                                    value={skillLevel.level}
                                                    onChange={(e) =>
                                                        updateSkillLevel(skillLevel.skill, 'level', e.target.value)
                                                    }
                                                    className="px-2 sm:px-3 py-1 border border-gray-300 rounded text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[80px] sm:min-w-[100px]"
                                                >
                                                    <option>Any</option>
                                                    <option>Beginner</option>
                                                    <option>Medium</option>
                                                    <option>Advanced</option>
                                                </select>
                                            </td>
                                            <td className="px-3 sm:px-6 py-2 sm:py-4 text-center">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={skillLevel.mcq || 0}
                                                    onChange={(e) =>
                                                        updateSkillLevel(skillLevel.skill, 'mcq', parseInt(e.target.value) || 0)
                                                    }
                                                    className="w-12 sm:w-16 px-1 sm:px-2 py-1 border border-gray-300 rounded text-xs sm:text-sm text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </td>
                                            <td className="px-3 sm:px-6 py-2 sm:py-4 text-center">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={skillLevel.coding || 0}
                                                    onChange={(e) =>
                                                        updateSkillLevel(skillLevel.skill, 'coding', parseInt(e.target.value) || 0)
                                                    }
                                                    className="w-12 sm:w-16 px-1 sm:px-2 py-1 border border-gray-300 rounded text-xs sm:text-sm text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </td>
                                            <td className="px-3 sm:px-6 py-2 sm:py-4 text-center">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={skillLevel.audio || 0}
                                                    onChange={(e) =>
                                                        updateSkillLevel(skillLevel.skill, 'audio', parseInt(e.target.value) || 0)
                                                    }
                                                    className="w-12 sm:w-16 px-1 sm:px-2 py-1 border border-gray-300 rounded text-xs sm:text-sm text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </td>
                                            <td className="px-3 sm:px-6 py-2 sm:py-4 text-center">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={skillLevel.video || 0}
                                                    onChange={(e) =>
                                                        updateSkillLevel(skillLevel.skill, 'video', parseInt(e.target.value) || 0)
                                                    }
                                                    className="w-12 sm:w-16 px-1 sm:px-2 py-1 border border-gray-300 rounded text-xs sm:text-sm text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="px-3 sm:px-6 py-3 sm:py-4 bg-gray-50 mt-2 flex flex-col sm:flex-row justify-between items-center gap-3 rounded-b-xl">
                        <span className="text-xs sm:text-sm font-semibold text-gray-900 text-center sm:text-left">
                            Total Questions: {getTotalQuestions()}
                        </span>

                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                            <button
                                onClick={onCancel}
                                disabled={loading}
                                className="px-4 sm:px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium text-sm sm:text-base transition-colors w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onNext}
                                disabled={loading || getTotalQuestions() === 0}
                                className="px-4 sm:px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-sm sm:text-base transition-colors w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Generating...' : 'Generate'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}