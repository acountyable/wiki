# Simple Wiki

[Lume](https://lume.land) theme to create a simple wiki.

- Use markdown to save the pages
- Instant search engine.

## Install as remote theme

The **fastest and easiest** way to use this theme is by importing it as a remote
module. It allows to create a blog in seconds and update it at any time just
changing the version number in the import url. Just add the following code to
your `_config.ts` file:

```ts
import lume from "lume/mod.ts";
import wiki from "https://deno.land/x/lume_theme_simple_wiki@v0.1.0/mod.ts";

const site = lume();

site.use(wiki());

export default site;
```

### Multilanguage support

Use the `languages` option to configure a multilanguage site:

```ts
site.use(wiki({
  languages: ["en", "gl", "es"],
}));
```

You can see an example in the [demo](./demo) folder. To customize it copy the
[`_data.yml`](./src/_data.yml) file in your blog root folder and edit it with
your own data.

## Use it as base template

To use this theme as a base template for a more customized blog, clone this repo
and edit the [_config.ts](./_config.ts) file. The source files are in the
[src](./src/) folder. And you can remove the `/demo` folder.

Certainly! Let's delve into the various components and links provided in the
**Clark County Assessor's Parcel Detail** interface. Understanding these
elements will help you navigate the system effectively and utilize the available
resources for comprehensive property information.

---

## **Overview of Clark County Assessor's Parcel Detail**

The **Clark County Assessor's Parcel Detail** webpage offers a wealth of
information about individual parcels within the county. This includes ownership
details, assessment values, property history, and various tools for searching
and managing parcel data. Below is an explanation of the key sections and links
you provided.

---

## **1. Main Parcel Detail Page**

### **[Parcel Detail](https://maps.clarkcountynv.gov/assessor/AssessorParcelDetail//parceldetail.aspx?hdnparcel=00103101004)**

- **Description:** This is the primary page displaying comprehensive information
  about a specific parcel. When you access this link with a specific parcel
  number (e.g., `00103101004`), it presents detailed data including ownership,
  location, assessed values, and property characteristics.

- **Key Information Displayed:**
  - **General Information:** Parcel number, owner details, mailing address,
    location address, city/township.
  - **Assessment Information:** Tax district, appraisal year, fiscal year,
    assessed values.
  - **Property Features:** Land size, construction year, land use, dwelling
    units, structure details.
  - **Additional Resources:** Links to maps, tax information, flood control, and
    more.

---

## **2. Additional Parcel Attribute Links**

These links provide specialized views or additional data related to the parcel.
Here's what each one offers:

### **[Parcel History](https://maps.clarkcountynv.gov/assessor/AssessorParcelDetail//parcelhistory.aspx?instance=pcl2&parcel=00103101004)**

- **Description:** Displays the historical records of the parcel, including past
  ownership, sales transactions, and any changes in assessed values over time.

- **Use Cases:**
  - **Ownership Changes:** Track how ownership has transitioned through sales,
    inheritance, or other means.
  - **Value Fluctuations:** Understand how the property's assessed value has
    changed, which can influence tax obligations.

- **Benefits:** Useful for buyers, sellers, historians, or anyone interested in
  the property's background.

### **[Parcel Sales](https://maps.clarkcountynv.gov/assessor/AssessorParcelDetail//parcelsales.aspx?parcel=00103101004)**

- **Description:** Lists all recorded sales transactions for the parcel,
  including sale prices, dates, and sale types.

- **Key Details:**
  - **Last Sale Price:** The most recent amount the property was sold for.
  - **Sale Date:** When the transaction took place.
  - **Sale Type:** Nature of the sale (e.g., purchase, inheritance, gift).
    [Refer to Sale Type Codes](http://www.clarkcountynv.gov/assessor/Documents/Sales_Codes.pdf)
    for specifics.

- **Benefits:** Assists potential buyers in assessing property value trends and
  understanding the property's market history.

### **[Parcel Tree](https://maps.clarkcountynv.gov/assessor/AssessorParcelDetail//parceltree.aspx?parcel=00103101004)**

- **Description:** Visualizes the hierarchical relationships and subdivisions
  associated with the parcel. This may include smaller parcels derived from the
  main parcel or related properties.

- **Use Cases:**
  - **Subdivision Details:** See how a larger parcel has been divided into
    smaller lots or units.
  - **Property Relationships:** Understand connections between adjacent or
    related parcels.

- **Benefits:** Valuable for developers, planners, or researchers interested in
  property layouts and land use patterns.

### **[Add Deed Codes](https://maps.clarkcountynv.gov/assessor/AssessorParcelDetail//adddeedcodes.aspx)**

- **Description:** Provides additional deed-related information and codes that
  pertain to the parcel. These codes can represent various legal or
  administrative attributes of the property's deed.

- **Key Features:**
  - **Deed Attributes:** Specific codes indicating easements, restrictions, or
    other deed conditions.
  - **Legal Implications:** Understanding any limitations or special conditions
    associated with the property's ownership.

- **Benefits:** Crucial for legal professionals, buyers, or sellers to
  comprehend the full legal context of the property.

### **[AOAD](https://maps.clarkcountynv.gov/assessor/AssessorParcelDetail//AOAD.aspx)**

- **Description:** **AOAD** stands for **"Parcel Search by Map Type"**. This
  tool allows users to search for parcels based on different map
  categorizations.

- **Use Cases:**
  - **Map-Based Searches:** Locate parcels using various map overlays or types,
    such as zoning maps, flood maps, or transportation maps.
  - **Customized Views:** Access parcels within specific map-defined areas or
    criteria.

- **Benefits:** Enhances the ability to find parcels based on geographic or
  thematic map categories, aiding in specialized research or planning.

### **[AORD](https://maps.clarkcountynv.gov/assessor/AssessorParcelDetail//aord.aspx)**

- **Description:** **AORD** refers to **"Non-Assessed Road Parcels"**. This
  section deals with parcels designated for roads that are not subject to
  property assessment.

- **Key Details:**
  - **Road Parcels:** Properties allocated for roadways, sidewalks, and related
    infrastructure.
  - **Non-Assessed Status:** These parcels typically do not have assessed
    property values as they serve public infrastructure purposes.

- **Benefits:** Important for understanding land use allocations for
  transportation and infrastructure within the county.

### **[AOSN](https://maps.clarkcountynv.gov/assessor/AssessorParcelDetail//AOSN.aspx)**

- **Description:** **AOSN** stands for **"Parcel Search by Subdivision Name"**.
  This tool allows users to search for parcels within a specific subdivision.

- **Use Cases:**
  - **Subdivision-Based Searches:** Locate all parcels within a named
    subdivision, useful for bulk data analysis or targeted inquiries.
  - **Community Planning:** Assist in reviewing properties within a neighborhood
    or development.

- **Benefits:** Facilitates efficient searching and management of parcels within
  defined residential or commercial subdivisions.

### **[ETAL Information](https://maps.clarkcountynv.gov/assessor/AssessorParcelDetail//etalinformation.aspx?cparcel=00103311042&hparcel=00103311042&refnumber=0)**

- **Description:** **ETAL** stands for **"Et Al."**, indicating additional
  owners beyond those listed explicitly. This page provides information on
  parcels with multiple owners.

- **Key Features:**
  - **Multiple Ownership Details:** Lists all owners associated with the parcel,
    especially when exceeding the display limit.
  - **Ownership Structure:** May include co-owners, trusts, or corporate
    entities.

- **Benefits:** Essential for understanding full ownership structures, which is
  particularly important for legal, financial, or administrative purposes.

### **[Glossary](https://maps.clarkcountynv.gov/assessor/AssessorParcelDetail//glossary.aspx)**

- **Description:** Provides definitions and explanations of terms and codes used
  within the Assessor's Parcel Detail system.

- **Key Features:**
  - **Terminology Definitions:** Clarifies technical terms, abbreviations, and
    codes related to property assessment and management.
  - **User Assistance:** Helps users interpret various data fields and
    understand the system's language.

- **Benefits:** Serves as a reference tool for users to accurately comprehend
  and navigate parcel information without confusion.

### **[NAMS](https://maps.clarkcountynv.gov/assessor/AssessorParcelDetail//NAMS.aspx?instance=pcl2&parcel=00103101004)**

- **Description:** **NAMS** typically stands for **"Nevada Appraisal Management
  System"** or a similar assessment-related system. This page likely provides
  access to detailed appraisal information for the parcel.

- **Key Features:**
  - **Appraisal Data:** Detailed assessments of property value, including market
    analysis and valuation methods.
  - **Assessment Reports:** Comprehensive reports used for taxation and property
    management.

- **Benefits:** Critical for property owners, tax assessors, and financial
  institutions to understand the assessed value and appraisal details of the
  property.

### **[No row found](https://maps.clarkcountynv.gov/assessor/AssessorParcelDetail//norowfound.aspx)**

- **Description:** This page appears when a search query does not return any
  results, indicating that no parcel matches the provided criteria.

- **Use Cases:**
  - **Error Handling:** Informs users that their search did not yield any
    matching parcels.
  - **Guidance:** May provide suggestions or alternative search options to
    locate the desired information.

- **Benefits:** Enhances user experience by clearly communicating unsuccessful
  search attempts and potentially guiding next steps.

### **[Page Error](https://maps.clarkcountynv.gov/assessor/AssessorParcelDetail//pageerror.aspx)**

- **Description:** This is an error page displayed when there is an issue
  loading the requested page or if an unexpected error occurs during navigation.

- **Use Cases:**
  - **Technical Issues:** Alerts users to technical problems that prevented the
    page from loading correctly.
  - **Support Information:** May provide contact information or troubleshooting
    steps to resolve the issue.

- **Benefits:** Ensures users are aware of issues and can seek assistance or
  retry their actions appropriately.

### **[Owner](https://maps.clarkcountynv.gov/assessor/AssessorParcelDetail//ownr.aspx)**

- **Description:** **Owner Search Page** allows users to search for parcels
  based on owner names or related ownership information.

- **Use Cases:**
  - **Ownership Inquiries:** Find all parcels owned by a specific individual or
    entity.
  - **Property Management:** Useful for landlords, property managers, or legal
    professionals tracking multiple properties.

- **Benefits:** Streamlines the process of locating properties based on
  ownership, facilitating efficient property searches and management.

### **[PCL](https://maps.clarkcountynv.gov/assessor/AssessorParcelDetail//pcl.aspx)**

- **Description:** **PCL** stands for **"Parcel Search Page"**. This tool
  enables users to search for parcels using various criteria such as parcel
  number, address, or other attributes.

- **Key Features:**
  - **Multiple Search Options:** Allows searching by parcel number, address,
    owner name, or subdivision.
  - **Advanced Filters:** Users can apply specific filters to narrow down search
    results based on detailed criteria.

- **Benefits:** Provides a versatile and user-friendly interface for locating
  specific parcels quickly and accurately.

### **[Site](https://maps.clarkcountynv.gov/assessor/AssessorParcelDetail//site.aspx)**

- **Description:** **Address Search Page** enables users to find parcels by
  entering a specific address or portion of an address.

- **Use Cases:**
  - **Property Location:** Quickly locate a parcel by its physical address.
  - **Residential or Commercial Searches:** Find properties based on street
    names, numbers, or landmarks.

- **Benefits:** Facilitates easy navigation and identification of parcels based
  on familiar address information, enhancing accessibility for all users.

---

## **3. Understanding the Navigation and Usage**

### **Navigating the Assessor's Parcel Detail System**

1. **Starting Point:** Begin with the
   **[Parcel Detail](https://maps.clarkcountynv.gov/assessor/AssessorParcelDetail//parceldetail.aspx?hdnparcel=00103101004)**
   page by entering a specific parcel number or using the search tools provided.

2. **Exploring Attributes:** Utilize the various links (e.g., Parcel History,
   Parcel Sales) to delve deeper into specific aspects of the parcel's
   information.

3. **Using Search Tools:**
   - **Owner Search:** Find parcels based on ownership.
   - **Parcel Search:** Locate parcels using numbers, addresses, or
     subdivisions.
   - **Specialized Searches:** Use AOAD, AORD, or AOSN for map-type or
     subdivision-specific searches.

4. **Handling Errors:** If a search yields no results or encounters a page
   error, refer to the **No row found** or **Page Error** pages for guidance.

5. **Additional Information:** Access supplementary resources like the
   **Glossary** to understand terminology or the **Add Deed Codes** for legal
   details.

### **Practical Applications**

- **Property Owners:** Verify ownership details, assess property values, and
  manage tax obligations.

- **Potential Buyers:** Research property history, assess market values, and
  understand zoning and land use.

- **Legal and Financial Professionals:** Access comprehensive property data for
  legal cases, financial assessments, or investment analysis.

- **Urban Planners and Developers:** Utilize parcel maps and land use
  information for planning and development projects.

---

## **4. Additional Resources and Support**

- **Adobe Reader Requirement:** To view detailed parcel maps, ensure that Adobe
  Reader is installed on your computer.
  [Download Adobe Reader](http://www.adobe.com/products/acrobat/readstep2.html)
  if you don't have it already.

- **Sales Type Codes:** For understanding the types of sales transactions, refer
  to the
  [Sale Type Codes](http://www.clarkcountynv.gov/assessor/Documents/Sales_Codes.pdf).

- **Contact Information:**
  - **Assessor's Office:** For specific inquiries or support, contact the Clark
    County Assessor's Office.
  - **Tax Information:** Refer to the Treasurer Information link for detailed
    property tax guidance.

---

## **5. Important Notes and Considerations**

- **Data Accuracy:** The assessor's records are intended for assessment purposes
  only. **Clark County Assessor's Office does not assume liability** for the
  accuracy of the data presented. Always verify critical information through
  official channels or legal documents.

- **Document Availability:** Only documents from **September 15, 1999, through
  the present** are available for online viewing. For older records, contact the
  assessor's office directly.

- **Security and Privacy:** Sensitive information, such as full ownership
  details beyond two lines, may be restricted or require special access
  permissions.

---

## **Summary**

The **Clark County Assessor's Parcel Detail** system is a robust tool designed
to provide comprehensive information about properties within the county. By
understanding and utilizing the various links and tools available, users can
effectively:

- **Identify and Locate Parcels:** Use parcel numbers, addresses, or owner names
  to find specific properties.
- **Explore Property Histories:** Access historical ownership and sales data to
  inform decisions.
- **Understand Assessment Values:** Review assessed values, tax districts, and
  exemptions to manage financial obligations.
- **Navigate Legal and Administrative Data:** Interpret deed codes, land use
  classifications, and subdivision details for legal and planning purposes.

Whether you're a property owner, potential buyer, legal professional, or urban
planner, mastering the use of these tools can significantly enhance your ability
to manage and understand property-related information within Clark County.

If you have any specific questions about navigating the system, interpreting
certain data fields, or utilizing the available tools, feel free to ask!
