import React, { useEffect, useRef, useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner';
import { useParams } from 'react-router-dom';
import { allUsers } from '../services/AllApi';
import { BASE_URL } from '../services/baseUrl';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function View() {


    const pdfRef=useRef()

    const [showspin, setShowspin] = useState(true)

    const [user, setUser] = useState({})

    const { id } = useParams()
    // console.log(id);

    useEffect(() => {

        getUser()
        setTimeout(() => {
            setShowspin(false)
        }, 2000);

    }, [])

    const getUser = async () => {
        const { data } = await allUsers("")
        // console.log(data);
        // console.log(data.find(item=>item._id===id));
        setUser(data.find(item => item._id === id))
    }

    // console.log(user);

    // grade calculation
    const getGrade = (marks) => {
        if (marks >= 90) {
            return 'S';
        } else if (marks >= 85 && marks < 90) {
            return 'A+';
        } else if (marks >= 80 && marks < 85) {
            return 'A';
        } else if (marks >= 75 && marks < 80) {
            return 'B+';
        } else if (marks >= 70 && marks < 75) {
            return 'B';
        } else if (marks >= 65 && marks < 70) {
            return 'C+';
        } else if (marks >= 60 && marks < 65) {
            return 'C';
        } else if (marks >= 55 && marks < 60) {
            return 'D';
        } else if (marks >= 45 && marks < 55) {
            return 'P';
        } else {
            return 'F'
        }
    };

    // changing subject name based on year
    const generateSubjectCode = (subjectCode, year) => {
        // Add a prefix based on the year
        if (year === '1st Year') {
            return `${subjectCode} 101`;
        } else if (year === '2nd Year') {
            return `${subjectCode} 201`;
        } else if (year === '3rd Year') {
            return `${subjectCode} 301`;
        } else {
            return `${subjectCode} 401`;
        }
    };

    // Percentage calculation
    const calculatePercentage = () => {
        const subjects = ['subject1', 'subject2', 'subject3', 'subject4', 'subject5', 'subject6'];
        const totalSubjects = subjects.length;
        let totalMarks = 0;

        subjects.forEach((subject) => {
            totalMarks += parseInt(user[subject]);
        });

        // Calculate percentage by finding the average marks
        const percentage = (totalMarks / (totalSubjects * 100)) * 100;
        return percentage.toFixed(2); // Round to 2 decimal places
    };

    // pdf download
    const downloadPDF=()=>{
        const input=pdfRef.current;
        html2canvas(input).then((canvas)=>{
            const imgData=canvas.toDataURL('image/png');
            const pdf=new jsPDF('p','mm','a4',true);
            const pdfWidth=pdf.internal.pageSize.getWidth();
            const pdfHeight=pdf.internal.pageSize.getHeight();
            const imgWidth=canvas.width;
            const imgHeight=canvas.height;
            const ratio=Math.min(pdfWidth/imgWidth,pdfHeight/imgHeight);
            const imgX=(pdfWidth-imgWidth*ratio)/2;
            const imgY=30;
            pdf.addImage(imgData,'PNG',imgX,imgY,imgWidth*ratio,imgHeight*ratio);
            pdf.save('card.pdf')
                });
    };

    return (
        <>
            {
                showspin ? <LoadingSpinner /> :
                    <div className='px-3 py-8 md:p-16'>
                        {
                            user ?

                                <div className='border shadow' ref={pdfRef}>
                                    <div style={{backgroundColor:'#b0c4de'}} className='bg-neutral py-5'>
                                        <h1 className='text-4xl font-semibold text-center'>Govt. Engineering College</h1>
                                    </div>
                                    <div className="avatar flex justify-center py-8">
                                        <div className="mask mask-squircle w-20 h-20 ">
                                            <img src={`${BASE_URL}/uploads/${user.profile}`} alt="No Image" />
                                        </div>
                                    </div>
                                    <div className='grid px-4 pb-8 gap-6 mb-6 md:grid-cols-2 border-b-2'>
                                        <p><b>Name :</b>   {user.fname} {user.lname}</p>
                                        <p><b>Year & Department</b> : {user.year} {user.department}</p>
                                        <p><b>Father's Name</b> : {user.father}</p>
                                        <p><b>Mother's Name</b> : {user.mother}</p>
                                        <p><b>Mobile</b> : {user.mobile}</p>
                                        <p><b>E-mail</b> : {user.email}</p>
                                        <p><b>Gender</b> : {user.gender}</p>
                                        <p><b>Location</b> : {user.location}</p>
                                    </div>
                                    <h2 className='font-medium pb-5 text-3xl text-center'>Academic Details</h2>
                                    <p className='px-3 py-2 md:p-6'><b>Faculty Advisor</b> : {user.faculty}</p>
                                    <div className='p-5 md:p-8'>
                                        <div className="overflow-x-auto flex justify-center">
                                            <table className="table md:w-4/6 border">
                                                {/* head */}
                                                <thead>
                                                    <tr style={{backgroundColor:'#b0c4de'}} className='bg-neutral'>
                                                        <th>Subject</th>
                                                        <th>Mark (100)</th>
                                                        <th>Grade</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* row 1 */}
                                                    <tr>
                                                        <td>{generateSubjectCode('MAT', user.year)}</td>
                                                        <td>{user.subject1}</td>
                                                        <td>{getGrade(user.subject1)}</td>
                                                    </tr>
                                                    {/* row 2 */}
                                                    <tr>
                                                        <td>{generateSubjectCode('CST', user.year)}</td>
                                                        <td>{user.subject2}</td>
                                                        <td>{getGrade(user.subject2)}</td>
                                                    </tr>
                                                    {/* row 3 */}
                                                    <tr>
                                                        <td>{generateSubjectCode('MCN', user.year)}</td>
                                                        <td>{user.subject3}</td>
                                                        <td>{getGrade(user.subject3)}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>{generateSubjectCode('HUT', user.year)}</td>
                                                        <td>{user.subject4}</td>
                                                        <td>{getGrade(user.subject4)}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>{generateSubjectCode('EST', user.year)}</td>
                                                        <td>{user.subject5}</td>
                                                        <td>{getGrade(user.subject5)}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>{generateSubjectCode('CSL', user.year)}</td>
                                                        <td>{user.subject6}</td>
                                                        <td>{getGrade(user.subject6)}</td>
                                                    </tr>
                                                    <tr className=' bg-slate-100' >
                                                        <th></th>
                                                        <th></th>
                                                        <th>{calculatePercentage()}%</th>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                : ""

                        }
                        <div className='flex justify-end'><button className="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={downloadPDF}>Download PDF</button></div>
                    </div>
            }

        </>
    )
}

export default View