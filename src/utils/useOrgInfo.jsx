import { useState, useEffect } from "react";
import { getOrganizations } from "../services/organizationService";

const useOrgInfo = () => {
  const [orgName, setOrgName] = useState("");
  const [
    higherSectionName,
    setHigherSectionName,
  ] = useState("");
  const [loadingOrg, setLoadingOrg] =
    useState(true);
  const [errorOrg, setErrorOrg] = useState(null);

  useEffect(() => {
    const fetchOrgData = async () => {
      try {
        const data = await getOrganizations();
        // console.log(data);
        if (
          data &&
          data.organizations &&
          data.organizations.length > 0
        ) {
          setOrgName(
            data.organizations[0].organizationName
          );
          setHigherSectionName(
            data.organizations[0].higherSection
          );
        } else {
          // จัดการกรณีที่ข้อมูลไม่พบหรือไม่ถูกต้อง
          console.warn(
            "No organization data found or data format is incorrect."
          );
          setOrgName("N/A");
          setHigherSectionName("N/A");
        }
      } catch (err) {
        console.error(
          "Error fetching organization data:",
          err
        );
        setErrorOrg(err);
        setOrgName("Error"); // ตั้งค่าในกรณีเกิดข้อผิดพลาด
        setHigherSectionName("Error"); // ตั้งค่าในกรณีเกิดข้อผิดพลาด
      } finally {
        setLoadingOrg(false);
      }
    };

    fetchOrgData();
  }, []); // [] เพื่อให้ useEffect ทำงานแค่ครั้งเดียวเมื่อ Component mount

  // Custom Hook ควร return ค่าที่ Component จะนำไปใช้ได้
  return {
    orgName,
    higherSectionName,
    loadingOrg,
    errorOrg,
  };
};

export default useOrgInfo;
