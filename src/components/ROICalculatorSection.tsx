import { Button } from "./ui/button";
import { Calculator } from "lucide-react";
import { useState, useMemo } from "react";
import { Slider } from "./ui/slider";
import { CALENDLY_LINK } from "@/config/constants";

export const ROICalculatorSection = () => {
  const [teamMembers, setTeamMembers] = useState([10]);
  const [hoursPerWeek, setHoursPerWeek] = useState([20]);
  const [hourlyCost, setHourlyCost] = useState([50]);

  const calculations = useMemo(() => {
    const employees = teamMembers[0];
    const hours = hoursPerWeek[0];
    const cost = hourlyCost[0];
    
    const weeklySavings = employees * hours * cost;
    const monthlySavings = weeklySavings * 4;
    const annualSavings = weeklySavings * 52;
    
    return {
      weekly: weeklySavings.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
      monthly: monthlySavings.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
      annual: annualSavings.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
    };
  }, [teamMembers, hoursPerWeek, hourlyCost]);

  return (
    <section className="py-24 bg-[hsl(var(--section-alt))]">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Calculate Your Automation <span className="text-gradient">ROI</span>
            </h2>
            <p className="text-xl text-primary-foreground/80">
              See how much time and money you could save with automation
            </p>
          </div>

          {/* Calculator Card */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Input Visualization */}
            <div className="glass-card-light rounded-3xl p-10 space-y-8">
              <div>
                <label className="text-sm font-medium text-primary-foreground mb-3 block">
                  Team members doing manual work
                </label>
                <Slider
                  value={teamMembers}
                  onValueChange={setTeamMembers}
                  max={50}
                  min={1}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-primary-foreground/60">1</span>
                  <p className="text-sm font-semibold text-primary-foreground">{teamMembers[0]} employees</p>
                  <span className="text-xs text-primary-foreground/60">50</span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-primary-foreground mb-3 block">
                  Hours spent per week
                </label>
                <Slider
                  value={hoursPerWeek}
                  onValueChange={setHoursPerWeek}
                  max={40}
                  min={1}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-primary-foreground/60">1</span>
                  <p className="text-sm font-semibold text-primary-foreground">{hoursPerWeek[0]} hours/week</p>
                  <span className="text-xs text-primary-foreground/60">40</span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-primary-foreground mb-3 block">
                  Average hourly cost
                </label>
                <Slider
                  value={hourlyCost}
                  onValueChange={setHourlyCost}
                  max={200}
                  min={10}
                  step={5}
                  className="mb-2"
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-primary-foreground/60">$10</span>
                  <p className="text-sm font-semibold text-primary-foreground">${hourlyCost[0]}/hour</p>
                  <span className="text-xs text-primary-foreground/60">$200</span>
                </div>
              </div>
            </div>

            {/* Right Side - Results */}
            <div className="glass-card gradient-primary rounded-3xl p-10 text-white">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Calculator className="w-6 h-6 text-white" />
                Your Potential Savings
              </h3>

              <div className="space-y-6">
                <div>
                  <p className="text-white/80 mb-2">Weekly savings</p>
                  <p className="text-4xl font-bold text-white">{calculations.weekly}</p>
                </div>

                <div>
                  <p className="text-white/80 mb-2">Monthly savings</p>
                  <p className="text-4xl font-bold text-white">{calculations.monthly}</p>
                </div>

                <div>
                  <p className="text-white/80 mb-2">Annual savings</p>
                  <p className="text-4xl font-bold text-accent">{calculations.annual}</p>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <p className="text-sm text-white/80">
                    ✓ Average ROI achieved in 3 months
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <Button size="lg" className="gradient-accent text-accent-foreground font-semibold px-8" asChild>
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                Get Your Custom ROI Report
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
