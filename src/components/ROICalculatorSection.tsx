import { Button } from "./ui/button";
import { Calculator } from "lucide-react";

export const ROICalculatorSection = () => {
  return (
    <section className="py-24 bg-[#F2F2F2]">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Calculate Your Automation <span className="text-gradient">ROI</span>
            </h2>
            <p className="text-xl text-primary/80">
              See how much time and money you could save with automation
            </p>
          </div>

          {/* Calculator Card */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Input Visualization */}
            <div className="glass-card-light rounded-3xl p-10 space-y-6">
              <div>
                <label className="text-sm font-medium text-primary/80 mb-2 block">
                  Team members doing manual work
                </label>
                <div className="h-3 bg-primary/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-accent" style={{ width: "70%" }}></div>
                </div>
                <p className="text-right text-sm text-primary/80 mt-1">10 employees</p>
              </div>

              <div>
                <label className="text-sm font-medium text-primary/80 mb-2 block">
                  Hours spent per week
                </label>
                <div className="h-3 bg-primary/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-accent" style={{ width: "50%" }}></div>
                </div>
                <p className="text-right text-sm text-primary/80 mt-1">20 hours/week</p>
              </div>

              <div>
                <label className="text-sm font-medium text-primary/80 mb-2 block">
                  Average hourly cost
                </label>
                <div className="h-3 bg-primary/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-accent" style={{ width: "60%" }}></div>
                </div>
                <p className="text-right text-sm text-primary/80 mt-1">$50/hour</p>
              </div>
            </div>

            {/* Right Side - Results */}
            <div className="glass-card gradient-primary rounded-3xl p-10 text-white">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Calculator className="w-6 h-6" />
                Your Potential Savings
              </h3>

              <div className="space-y-6">
                <div>
                  <p className="text-white/80 mb-2">Weekly savings</p>
                  <p className="text-4xl font-bold">$9,000</p>
                </div>

                <div>
                  <p className="text-white/80 mb-2">Monthly savings</p>
                  <p className="text-4xl font-bold">$36,000</p>
                </div>

                <div>
                  <p className="text-white/80 mb-2">Annual savings</p>
                  <p className="text-4xl font-bold text-accent">$432,000</p>
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
            <Button size="lg" className="gradient-accent text-accent-foreground font-semibold px-8">
              Get Your Custom ROI Report
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
