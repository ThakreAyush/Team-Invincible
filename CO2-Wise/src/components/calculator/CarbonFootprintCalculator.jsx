import React, { useState } from "react";
import { useForm, } from "react-hook-form";
import {
  Shovel,
  Truck,
  HardHat,
  Zap,
  Thermometer,
  Wind,
  Plus,
  HelpCircle,
} from "lucide-react";

const factors = [
  { name: "excavation", icon: Shovel, unit: "tons", tooltip: "Amount of coal excavated" },
  { name: "transportation", icon: Truck, unit: "km", tooltip: "Distance traveled for coal transportation" },
  { name: "equipment", icon: HardHat, unit: "hours", tooltip: "Hours of equipment operation" },
  { name: "electricity", icon: Zap, unit: "kWh", tooltip: "Electricity consumed in operations" },
  { name: "heat", icon: Thermometer, unit: "BTU", tooltip: "Heat energy used in processes" },
  { name: "air", icon: Wind, unit: "m³", tooltip: "Air quality impact" },
  { name: "other", icon: Plus, unit: "kg CO2e", tooltip: "Other sources of emissions" },
];

const emissionFactors = {
  excavation: 0.8,
  transportation: 0.1,
  equipment: 2.5,
  electricity: 0.5,
  heat: 0.0001,
  air: 0.02,
  other: 1,
};

export default function CarbonFootprintCalculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [totalEmissions, setTotalEmissions] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const total = Object.entries(data).reduce((sum, [factor, value]) => {
      return (
        sum +
        (parseFloat(value) || 0) *
          emissionFactors[factor]
      );
    }, 0);
    setTotalEmissions(total);
    setCurrentStep(factors.length);
  };

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, factors.length - 1));
  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Coal Mining Carbon Footprint Calculator</h2>
          <div className="relative w-16 h-16">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle className="text-gray-700 opacity-20" strokeWidth="8" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
              <circle className="text-white" strokeWidth="8" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50"
                strokeDasharray={`${(currentStep / (factors.length - 1)) * 251.2} 251.2`}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">{currentStep + 1}/{factors.length}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative h-64 overflow-hidden">
            {factors.map((factor, index) => (
              <div
                key={factor.name}
                className="absolute top-0 left-0 w-full transition-all duration-500"
                style={{
                  transform: `translateX(${(index - currentStep) * 100}%)`,
                  opacity: index === currentStep ? 1 : 0,
                }}
              >
                <div className="flex flex-col items-center space-y-4">
                  <factor.icon size={40} />
                  <h3 className="text-xl font-semibold capitalize">{factor.name}</h3>
                  <input
                    type="number"
                    placeholder={`Enter ${factor.unit}`}
                    {...register(factor.name, { required: true, min: 0 })}
                    className="p-2 w-full max-w-md rounded bg-white/10 text-white placeholder-gray-400 border border-white/20"
                  />
                  {errors[factor.name] && (
                    <p className="text-red-400 text-sm">This field is required and must be non-negative</p>
                  )}
                </div>
              </div>
            ))}

            {currentStep === factors.length && (
              <div className="absolute top-0 left-0 w-full">
                <h3 className="text-center text-xl font-semibold mb-4">Carbon Footprint Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-white">
                  {factors.map((factor) => (
                    <div key={factor.name} className="flex justify-between">
                      <span className="capitalize">{factor.name}:</span>
                      <span>{watch(factor.name) || "0"} {factor.unit}</span>
                    </div>
                  ))}
                </div>
                <div className="text-2xl text-center mt-6 font-bold">
                  Total Emissions: {totalEmissions.toFixed(2)} kg CO2e
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-8">
            <button type="button" onClick={handlePrev} disabled={currentStep === 0}
              className="bg-white/10 text-white px-4 py-2 rounded border border-white/20 hover:bg-white/20"
            >
              Previous
            </button>
            {currentStep < factors.length - 1 ? (
              <button type="button" onClick={handleNext}
                className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
              >
                Next
              </button>
            ) : (
              <button type="submit" className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
                Calculate
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
