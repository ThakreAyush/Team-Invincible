"use client";

import React, { useState } from "react";
import {
  Flame,
  Truck,
  Wrench,
  BatteryCharging,
  Sun,
  Wind,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  BarChart3,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./ui/tooltip";

const factors = [
  {
    name: "extraction",
    label: "Fuel Extraction",
    unit: "tons",
    tooltip: "Amount of fossil fuel extracted",
    icon: Flame,
  },
  {
    name: "transport",
    label: "Logistics",
    unit: "km",
    tooltip: "Distance traveled by transport vehicles",
    icon: Truck,
  },
  {
    name: "machinery",
    label: "Machinery Usage",
    unit: "hours",
    tooltip: "Machinery operation duration",
    icon: Wrench,
  },
  {
    name: "power",
    label: "Electric Power",
    unit: "kWh",
    tooltip: "Electricity consumption",
    icon: BatteryCharging,
  },
  {
    name: "thermal",
    label: "Thermal Energy",
    unit: "BTU",
    tooltip: "Thermal energy used",
    icon: Sun,
  },
  {
    name: "airImpact",
    label: "Air Impact",
    unit: "m³",
    tooltip: "Volume of air affected",
    icon: Wind,
  },
];

const emissionFactors = {
  extraction: 0.9,
  transport: 0.08,
  machinery: 2.2,
  power: 0.4,
  thermal: 0.0002,
  airImpact: 0.03,
};

export default function CarbonCal() {
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState({
    extraction: "",
    transport: "",
    machinery: "",
    power: "",
    thermal: "",
    airImpact: "",
  });
  const [totalEmissions, setTotalEmissions] = useState(0);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    const currentFactor = factors[step].name;
    const value = parseFloat(inputs[currentFactor]);
    if (isNaN(value) || value < 0) {
      setErrors((prev) => ({ ...prev, [currentFactor]: true }));
    } else {
      setErrors((prev) => ({ ...prev, [currentFactor]: false }));
      setStep((prev) => Math.min(prev + 1, factors.length));
    }
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleCalculate = () => {
    let total = 0;

    for (let factor of factors) {
      const input = parseFloat(inputs[factor.name]);
      const emissionFactor = emissionFactors[factor.name];

      if (!isNaN(input) && input >= 0) {
        total += input * emissionFactor;
      }
    }

    setTotalEmissions(total);
    setStep(factors.length); // go to summary page
  };

  const handleRestart = () => {
    setInputs({
      extraction: "",
      transport: "",
      machinery: "",
      power: "",
      thermal: "",
      airImpact: "",
    });
    setTotalEmissions(0);
    setStep(0);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row text-gray-900">
      {/* Sidebar */}
      <aside className="bg-[#04913e] p-6 w-full md:w-1/3 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-4 text-white">
            EcoTrace Calculator
          </h1>
          <p className="text-gray-100 mb-6 text-sm">
            Track your carbon emissions across multiple industrial factors.
          </p>
          <ul className="space-y-3 text-sm">
            {factors.map((factor, i) => (
              <li
                key={factor.name}
                className={`flex items-center gap-2 p-2 rounded-md ${
                  step === i ? "bg-green-900" : "bg-transparent"
                }`}
              >
                <factor.icon size={18} className="text-white" />
                <span className="text-zinc-200">{factor.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-xs text-gray-100 mt-6">© 2025 EcoTrace</div>
      </aside>

      {/* Main Card */}
      <main className="flex-1 p-6 flex justify-center items-center bg-zinc-200">
        <Card className="w-full max-w-2xl bg-zinc-300 border-none shadow-lg rounded-xl">
          <CardContent className="p-8">
            {step < factors.length ? (
              <>
                <div className="text-center mb-6">
                  {(() => {
                    const Icon = factors[step].icon;
                    return (
                      <Icon size={40} className="mx-auto text-green-500" />
                    );
                  })()}
                  <h2 className="text-xl font-semibold mt-2 text-gray-900">
                    {factors[step].label}
                  </h2>
                </div>

                <Label
                  htmlFor={factors[step].name}
                  className="text-gray-900 mb-2 flex items-center"
                >
                  Enter {factors[step].label} ({factors[step].unit})
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="ml-2 h-4 w-4 text-gray-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{factors[step].tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>

                <Input
                  id={factors[step].name}
                  name={factors[step].name}
                  type="number"
                  value={inputs[factors[step].name]}
                  onChange={handleChange}
                  className="mb-4 bg-gray-100 text-gray-900 border-green-300 placeholder:text-gray-400"
                  placeholder={`Enter value in ${factors[step].unit}`}
                />
                {errors[factors[step].name] && (
                  <p className="text-red-400 text-sm mb-4">
                    This field is required and must be a non-negative number.
                  </p>
                )}

                <div className="flex justify-between mt-6">
                  <Button
                    type="button"
                    onClick={handleBack}
                    disabled={step === 0}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800"
                  >
                    <ChevronLeft className="mr-1" /> Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Next <ChevronRight className="ml-1" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-900 space-y-6">
                <BarChart3 size={48} className="mx-auto text-green-500" />
                <h2 className="text-2xl font-bold">Summary</h2>
                <div className="grid grid-cols-2 gap-4 text-sm text-left">
                  {factors.map((f) => (
                    <div key={f.name} className="flex justify-between">
                      <span>{f.label}</span>
                      <span>
                        {inputs[f.name] || 0} {f.unit}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="text-xl font-semibold text-green-500 mt-4">
                  Total CO₂ Emissions: {totalEmissions.toFixed(2)} kg CO₂e
                </div>
                <Button
                  onClick={handleRestart}
                  className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                >
                  Restart Calculation
                </Button>
              </div>
            )}

            {step === factors.length - 1 && (
              <div className="mt-6">
                <Button
                  onClick={handleCalculate}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  Calculate Emissions
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
