import self from "../img/self.png"
import mock1 from "../img/mock1.png"
import mock2 from "../img/mock2.png"
import mock3 from "../img/mock3.png"
import mock4 from "../img/mock4.png"
import mock5 from "../img/mock5.png"

/* Hi there! Thanks for checking out my portfolio template. Be sure to read the comments to get a better understanding of
how to make this template work best for you! */

export let colors = ["rgb(0,172,255)", "rgba(0,172,255,0.87)"];
export let maincolor = "#031826FF"
/*
I highly recommend using a gradient generator like https://gradientgenerator.paytonpierce.dev/ to generate a pair of colors that you like.
These colors will be used to style your name on the homepage, the background of your picture, and some other accents throughout
the site.
 */


/*
So let's get started! Some of the info below is pretty self-explanatory, like 'firstName' and 'bio'. I'll try to explain anything
that might not be obvious right off the bat :) I recommend looking at the template example live using "npm start" to get an idea
of what each of the values mean.
 */

export const info = {
    firstName: "Junior",
    lastName: "Wagoussi",
    initials: "jw", // the example uses first and last, but feel free to use three or more if you like.
    position: ['Fullstack Developer', 'Software Developer', 'Decision Analyst'],
    selfPortrait: self, // don't change this unless you want to name your self-portrait in the "img" folder something else!
    gradient: `-webkit-linear-gradient(135deg, ${maincolor})`, // don't change this either
    baseColor: colors[0],
    maincolor: maincolor,
    miniBio: [ // these are just some "tidbits" about yourself. You can look at mine https://paytonjewell.github.io/#/ for an example if you'd like
        {
            emoji: '🎓',
            text: 'Master’s student in Software Engineering and Business Intelligence'
        },
        {
            emoji: '🌎',
            text: 'based in Cotonou, Benin Republic'
        },
        {
            emoji: "💼",
            text: "co-promoter of OTHSoft"
        },
        {
            emoji: "📧",
            text: "oscarjrw@gmail.com"
        }
    ],
    socials: [
        {
            link: "https://web.facebook.com/profile.php?id=100073238625607",
            icon: 'fa fa-facebook',
            label: 'facebook'
        },
        {
            link: "https://www.instagram.com/osk.junior/",
            icon: 'fa fa-instagram',
            label: 'instagram'
        },
        {
            link: "https://github.com/oscarjrw",
            icon: "fa fa-github",
            label: 'github'
        },
        {
            link: "www.linkedin.com/in/oscarjrw",
            icon: "fa fa-linkedin",
            label: 'linkedin'
        },
        {
            link: "https://twitter.com/oscarjrw",
            icon: "fa fa-twitter",
            label: 'twitter'
        }
// Feel free to remove any of these that you don't have. I'll write an FAQ on how to add new ones later, let me know if you have a request for an icon!
// Just change the links so that they lead to your social profiles.

    ],
    bio: "Hello, I'm Junior Wagoussi, a 2nd year Master's student in Software Engineering and Business Intelligence. My skills cover a wide range of areas, with roles as Fullstack Developer, Software Engineer and Business Analyst. Passionate about IT, I am dedicated to continuous learning, particularly in artificial intelligence. My goal is to merge creativity with problem solving to create innovative technology solutions.",
    skills: {
        proficientWith: [
            {skill: 'HTML/CSS', percentage: 90},
            {skill: 'javascript', percentage: 75},
            {skill: 'PHP', percentage: 80},
            {skill: 'Python', percentage: 75},
            {skill: 'ReactJS', percentage: 70},
            {skill: 'Laravel', percentage: 70},
            {skill: 'Symfony', percentage: 80},
            {skill: 'Django', percentage: 70},
            {skill: 'Git', percentage: 80}
        ],
        exposedTo: [
            {skill: 'Java', percentage: 60},
            {skill: 'SpringBoot', percentage: 60},
            {skill: 'Adobe Photoshop', percentage: 65},
            {skill: 'Adobe XD', percentage: 60},
        ],
    }
    ,
    hobbies: [
        {
            label: 'reading',
            emoji: '📖'
        },
        {
            label: 'movies',
            emoji: '🎥'
        },
        {
            label: 'cooking',
            emoji: '🌶'
        },
        {
            label: 'football',
            emoji: '⚽'
        },
        {
            label: 'tennis',
            emoji: '🎾'
        },
        {
            label: 'rubik\'s cube',
            emoji: '🧩'
        },
        {
            label: 'dame',
            emoji: '♟️'
        },
        {
            label: 'scrabble',
            emoji: '🔤'
        },
        {
            label: 'des chiffres et des lettres',
            emoji: '📺'
        },
        {
            label: 'learning new techs',
            emoji: '💻'
        }
    ],
    formation: [
        {paragraph: "I am currently pursuing a Master's degree in Software Engineering and Business Intelligence, set to be completed in 2024. This program seamlessly integrates theoretical knowledge with practical insights, preparing me to meet the dynamic challenges of the IT industry. My academic journey began with the successful completion of a Bachelor's degree in Computer Science in 2018, specializing in Information Systems Analysis and Programming. This foundational education laid the groundwork for a robust understanding of computer science principles."},
        {paragraph: "In 2019, a pivotal internship at Solutech Corporate allowed me to apply my academic knowledge to real-world web development projects. Since 2020, I've been actively freelancing, collaborating on diverse web development projects. This entrepreneurial experience not only expanded my technical skills but also provided valuable insights into the freelancing landscape."},
        {paragraph: "At the same time, I co-created my own IT company in 2023, OTHSoft, specializing in the creation of sites and web applications, as well as graphic design. This initiative allowed me to play a central role in the development of innovative projects, further strengthening my understanding of the domain and my ability to deliver high quality IT solutions."},
        {paragraph: "Driven by a passion for continuous learning, I am eager to deepen my expertise in artificial intelligence as I progress through my Master's program."}
    ],
    projects: [
        {
            title: 'SIG (Integrated Management System)',
            description: 'The SIG project is a comprehensive management system that integrates all the necessary functionalities for optimal organizational management. It provides advanced solutions for resource, process, and data management.',
            link: 'https://sig.cosit-benin.com/',
        },
        {
            title: 'MySchool',
            description: 'MySchool is a web application specialized in school management. Suitable for all educational levels, from primary to higher education, it simplifies administrative, pedagogical, and logistical management.',
            link: 'https://csbergerfidele.o-myschool.com/',
        },
        {
            title: 'AGCC (Consular Card Management Application)',
            description: 'The AGCC is an application that facilitates the issuance and generation of consular cards for Burkinabés entering the Benin territory. It serves as an identity card and offers a secure and efficient solution.',
            link: '',
        },
        {
            title: 'Sondyn',
            description: 'Sondyn is a web application dedicated to survey management. Users can participate in surveys on various topics, including elections. The application ensures efficient collection and analysis of responses.',
            link: '',
        },
        {
            title: 'WhatsChat',
            description: 'WhatsChat is an application that simulates communication via the WhatsApp API. Although it is a fictional application, it highlights skills in integrating with third-party services.',
            link: '',
        },
        {
            title: 'AGTT (Temporary Access Titles Management Application)',
            description: 'The AGTT offers a computerized solution for managing temporary access titles at the Port Autonome de Cotonou. It enables the rapid generation of temporary cards for access to the port.',
            link: '',
        },
    ],
    portfolio: [ // This is where your portfolio projects will be detailed
        {
            title: "Project 1",
            live: "https://paytonpierce.dev", //this should be a link to the live version of your project, think github pages, netlify, heroku, etc. Or your own domain, if you have it.
            source: "https://github.com/paytonjewell", // this should be a link to the **repository** of the project, where the code is hosted.
            image: mock1
        },
        {
            title: "Project 2",
            live: "https://paytonpierce.dev",
            source: "https://github.com/paytonjewell",
            image: mock2
        },
        {
            title: "Project 3",
            live: "https://paytonpierce.dev",
            source: "https://github.com/paytonjewell",
            image: mock3
        },
        {
            title: "Project 4",
            live: "https://paytonpierce.dev",
            source: "https://github.com/paytonjewell",
            image: mock4
        },
        {
            title: "Project 5",
            live: "https://paytonpierce.dev",
            source: "https://github.com/paytonjewell",
            image: mock5
        }
    ]
}