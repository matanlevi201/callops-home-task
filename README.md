 <table style="border: none;">
  <tr style="border: none;">
    <td style="border: none;">
      <img src="https://github.com/user-attachments/assets/3da0ffdc-2e2f-4a06-a12a-4d936b543921" alt="callops" width="320"/>
    </td>
    <td style="vertical-align: top; padding-left: 20px; border: none;">
      <p  style="border: none;">
        <strong>This is my submission for the full-stack developer home assignment.</strong><br />
        It’s a streamlined internal platform for managing incoming calls and task assignments during emergencies, built for efficiency and clarity.
      </p>
    </td>
  </tr>
</table>

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, ShadCN UI
- **Backend**: Node.js, TypeScript, Express, Prisma ORM
- **Database**: PostgreSQL
- **Auth**: Not requested.
- **Security & Monitoring**: Snyk (vulnerability scanning)

## 🔧 Features Implemented

- Create, edit, and track **calls** with descriptions and metadata.
- Tagging system for calls using **many-to-many** relationships.
- Assign and update **tasks** linked to each call.
- Prisma schema with enums and relations.
- Responsive, mobile-friendly UI with modern DX (developer experience).

## 🔐 Security: Snyk Report Summary

- **Code analysis**: 2 medium, 1 low vulnerabilities
- **Frontend/backend**: No critical or high-severity issues detected.
    
![synk](https://github.com/user-attachments/assets/b562e737-23bd-43dc-ad30-eafc4e9e624c)
    

## 📱 Responsive Design Check

The application was tested and optimized for responsiveness across major device types:

![resposive-check](https://github.com/user-attachments/assets/b206a455-c654-400a-af70-f3217baf3755)


## 🧩 Considerations Beyond Scope

Though not required, I kept the following in mind during development to ensure production-readiness and architectural foresight:

- **API rate limiting** – to prevent abuse in production.
- **SQL injection protection** – handled safely by **Prisma ORM** via automatic input sanitization and variable parameterization.
- **Pagination for large datasets** – there is no large amount of data so its not necessary at this stage.
- **Search & filter capabilities** – thought about extending the list views with keyword-based and tag-based filtering for better UX.
- **Database indexing & column projection -** data is small so no need but considered adding indexes on searchable/filterable fields and using selective field projections
