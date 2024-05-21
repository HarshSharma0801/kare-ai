"use client";
import { useState } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MainForm = () => {
  const [SelectedIndustry, setSelectedIndustry] = useState<number | null>(null);
  const [Industry, setIndustry] = useState<string | null>(null);
  const [SubIndustry, setSubIndustry] = useState<string | null>(null);

  const [Region, setRegion] = useState<string | null>(null);
  const [CompValue, setCompValue] = useState<string>("");

  const industries = [
    "Renewable Energy",
    "Healthcare Technology",
    "Artificial Intelligence",
    "Fintech (Financial Technology)",
    "Clothing Sector",
    "Smart Cities",
  ];

  const subIndustries = [
    [
      "Solar Power",
      "Wind Energy",
      "Hydrogen Energy",
      "Geothermal Energy",
      "Bioenergy",
    ],

    [
      "Telemedicine",
      "Digital Health",
      "Biotech Innovations",
      "Medical Devices",
      "Health AI",
    ],

    [
      "Machine Learning",
      "Robotics",
      "AI Ethics and Governance",
      "AI in Finance",
      "AI in Customer Service",
    ],

    // Fintech (Financial Technology)
    [
      "Digital Banking",
      "Blockchain and Cryptocurrency",
      "Insurtech",
      "Payment Processing",
      "Regtech",
    ],

    // Clothing Sector
    [
      "Fast Fashion",
      "Luxury Fashion",
      "Athleisure",
      "Sustainable and Ethical Fashion",
      "Custom and Personalized Fashion",
    ],

    // Sustainable Fashion
    [
      "Eco-Friendly Materials",
      "Ethical Manufacturing",
      "Circular Fashion",
      "Sustainable Fashion Tech",
      "Green Retail",
    ],

    [
      "Smart Infrastructure",
      "Urban Mobility",
      "Public Safety",
      "Environmental Monitoring",
      "E-Governance",
    ],
  ];

  const handlechange = (e: any) => {
    setIndustry(e);
    const index = industries.findIndex((data) => data === e);
    setSelectedIndustry(index);
  };

  const handleSubChange = (e: any) => {
    setSubIndustry(e);
  };
  const handleRegionchange = (e: any) => {
    setRegion(e);
  };

  const handleCompanyValue = (e: any) => {
    setCompValue(e);
  };

  const GetResult = async () => {
    const data = {
      industry_sector: Industry,
      industry_subsector: SubIndustry,
      region: Region,
    };
    try {
      await axios
        .post(
          "https://4ebpc6pfcc.execute-api.ap-south-1.amazonaws.com/industry_trends",
          data
        )
        .then((res) => {
          if (res) {
            console.log(res.data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full h-full flex py-20 justify-center">
        <div className="flex justify-center items-center flex-col gap-10">
          <div>Please Provide details below to generate Report</div>
          <div>
            <Select onValueChange={handlechange}>
              <SelectTrigger className="w-[280px] focus:ring-offset-0 focus:ring-0">
                <SelectValue placeholder="Select the Industry Sector" />
              </SelectTrigger>
              <SelectContent>
                {industries &&
                  industries.map((data: any) => {
                    return <SelectItem value={data}>{data}</SelectItem>;
                  })}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              onValueChange={handleSubChange}
              disabled={SelectedIndustry == null}
            >
              <SelectTrigger className="w-[280px] outline-none focus:ring-offset-0 focus:ring-0">
                <SelectValue
                  placeholder="Select the Industry Sub Sector"
                  className="outline-none"
                />
              </SelectTrigger>
              <SelectContent>
                {SelectedIndustry !== null &&
                  subIndustries[SelectedIndustry].map((data: any) => {
                    return <SelectItem value={data}>{data}</SelectItem>;
                  })}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select onValueChange={handleRegionchange}>
              <SelectTrigger className="w-[280px] focus:ring-offset-0 focus:ring-0">
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="india">India</SelectItem>
                <SelectItem value="worldwide">WorldWide</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Input
              onChange={handleCompanyValue}
              className="w-[280px] outline-none focus:ring-offset-0 focus:ring-0 focus-visible:ring-0 "
              placeholder="Your Company Value Proposition"
            />
          </div>

          <div>
            <Button
              onClick={GetResult}
              className="w-[280px] bg-primary text-white font-semibold"
            >
              Run Market Research Agent
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainForm;
