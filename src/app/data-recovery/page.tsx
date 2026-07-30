import type { Metadata } from "next";
import DataRecoveryClient from "./DataRecoveryClient";

export const metadata: Metadata = {
  title: "Professional Data Recovery Services | SkyEagle Technologies",
  description: "Secure and confidential data recovery for damaged mechanical hard drives (HDD), solid state drives (SSD/NVMe), encrypted volumes, RAID arrays, and server storages in Bengaluru.",
  keywords: ["hard disk recovery Bangalore", "SSD data recovery", "RAID data recovery", "BitLocker recovery", "recover deleted files"],
};

export default function DataRecoveryPage() {
  return <DataRecoveryClient />;
}
