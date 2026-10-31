export const SITE = {
    url: "https://multithefranky.com",
    name: "MultiTheFranky",
    author: "Francisco Álamo García",
    jobTitle: "Software Engineer",
    email: "me@multithefranky.com",
    locale: "en_US",
    description:
        "Francisco “Franky” Álamo García — Software Engineer from Santander, Spain. Full-stack developer working with React, Astro, Node.js and the cloud at Incentro.",
    twitter: "@multithefranky"
};

export type Social = {
    name: string;
    icon: string;
    link: string;
};

export const socials: Social[] = [
    {
        name: "Github",
        icon: "/socials/github.svg",
        link: "https://github.com/multithefranky"
    },
    {
        name: "Linkedin",
        icon: "/socials/linkedin.svg",
        link: "https://www.linkedin.com/in/franciscoalamogarcia/"
    },
    {
        name: "X",
        icon: "/socials/x.svg",
        link: "https://x.com/multithefranky"
    },
    {
        name: "Instagram",
        icon: "/socials/instagram.svg",
        link: "https://www.instagram.com/multithefranky/"
    },
    {
        name: "Twitch",
        icon: "/socials/twitch.svg",
        link: "https://www.twitch.tv/frankyscripter"
    },
    {
        name: "Youtube",
        icon: "/socials/youtube.svg",
        link: "https://www.youtube.com/channel/UCWWoFj78QojfXnCv4fNddVg"
    }
];

export type Knowledge = {
    name: string;
    icon: string;
    link: string;
    inverted?: boolean;
};

export type MainKnowledge = {
    name: string;
    knowledge: Knowledge[];
};

export const knowledgeGroups: MainKnowledge[] = [
    {
        name: "Frontend",
        knowledge: [
            {
                name: "React",
                icon: "https://cdn.svgporn.com/logos/react.svg",
                link: "https://reactjs.org/"
            },
            {
                name: "Astro",
                icon: "https://cdn.svgporn.com/logos/astro-icon.svg",
                link: "https://astro.build/",
                inverted: true
            },
            {
                name: "NextJS",
                icon: "https://cdn.svgporn.com/logos/nextjs-icon.svg",
                link: "https://nextjs.org/",
                inverted: true
            },
            {
                name: "TailwindCSS",
                icon: "https://cdn.svgporn.com/logos/tailwindcss-icon.svg",
                link: "https://tailwindcss.com/"
            },
            {
                name: "Sass",
                icon: "https://cdn.svgporn.com/logos/sass.svg",
                link: "https://sass-lang.com/"
            },
            {
                name: "TypeScript",
                icon: "https://cdn.svgporn.com/logos/typescript-icon.svg",
                link: "https://www.typescriptlang.org/"
            },
            {
                name: "JavaScript",
                icon: "https://cdn.svgporn.com/logos/javascript.svg",
                link: "https://www.javascript.com/"
            },
            {
                name: "HTML",
                icon: "https://cdn.svgporn.com/logos/html-5.svg",
                link: "https://developer.mozilla.org/en-US/docs/Web/HTML"
            },
            {
                name: "CSS",
                icon: "https://cdn.svgporn.com/logos/css-3.svg",
                link: "https://developer.mozilla.org/en-US/docs/Web/CSS"
            }
        ]
    },
    {
        name: "Backend",
        knowledge: [
            {
                name: "NodeJS",
                icon: "https://cdn.svgporn.com/logos/nodejs-icon.svg",
                link: "https://nodejs.org/en/"
            },
            {
                name: "Express",
                icon: "https://cdn.worldvectorlogo.com/logos/expressjs.svg",
                link: "https://expressjs.com/",
                inverted: true
            },
            {
                name: "MongoDB",
                icon: "https://cdn.svgporn.com/logos/mongodb-icon.svg",
                link: "https://www.mongodb.com/"
            },
            {
                name: "MySQL",
                icon: "https://cdn.svgporn.com/logos/mysql.svg",
                link: "https://www.mysql.com/"
            },
            {
                name: "PostgreSQL",
                icon: "https://cdn.svgporn.com/logos/postgresql.svg",
                link: "https://www.postgresql.org/"
            },
            {
                name: "Redis",
                icon: "https://cdn.svgporn.com/logos/redis.svg",
                link: "https://redis.io/"
            },
            {
                name: "GraphQL",
                icon: "https://cdn.svgporn.com/logos/graphql.svg",
                link: "https://graphql.org/"
            }
        ]
    },
    {
        name: "DevOps",
        knowledge: [
            {
                name: "Docker",
                icon: "https://cdn.svgporn.com/logos/docker-icon.svg",
                link: "https://www.docker.com/"
            },
            {
                name: "Kubernetes",
                icon: "https://cdn.svgporn.com/logos/kubernetes.svg",
                link: "https://kubernetes.io/"
            },
            {
                name: "Nginx",
                icon: "https://cdn.svgporn.com/logos/nginx.svg",
                link: "https://www.nginx.com/"
            },
            {
                name: "Cloudflare",
                icon: "https://cdn.svgporn.com/logos/cloudflare.svg",
                link: "https://www.cloudflare.com/"
            },
            {
                name: "Azure",
                icon: "https://cdn.svgporn.com/logos/microsoft-azure.svg",
                link: "https://azure.microsoft.com/"
            },
            {
                name: "Google Cloud",
                icon: "https://cdn.svgporn.com/logos/google-cloud.svg",
                link: "https://cloud.google.com/"
            },
            {
                name: "CommerceTools",
                icon: "https://images.ctfassets.net/8q83c033chii/5Gjg45bFu7RmGWLq0wCOll/06e81074e4a44eb6116e0b09cf697834/Partner_Commercetools.svg",
                link: "https://commercetools.com/"
            },
            {
                name: "Twilio",
                icon: "https://cdn.svgporn.com/logos/twilio-icon.svg",
                link: "https://www.twilio.com/"
            },
            {
                name: "SendGrid",
                icon: "https://cdn.svgporn.com/logos/sendgrid-icon.svg",
                link: "https://sendgrid.com/"
            },
            {
                name: "GitHub",
                icon: "https://cdn.svgporn.com/logos/github-octocat.svg",
                link: "https://github.com",
                inverted: true
            },
            {
                name: "Grafana",
                icon: "https://cdn.svgporn.com/logos/grafana.svg",
                link: "https://grafana.com/"
            }
        ]
    }
];
