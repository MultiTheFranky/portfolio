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
                icon: "/logos/react.svg",
                link: "https://reactjs.org/"
            },
            {
                name: "Astro",
                icon: "/logos/astro.svg",
                link: "https://astro.build/",
                inverted: true
            },
            {
                name: "NextJS",
                icon: "/logos/nextjs.svg",
                link: "https://nextjs.org/",
                inverted: true
            },
            {
                name: "TailwindCSS",
                icon: "/logos/tailwindcss.svg",
                link: "https://tailwindcss.com/"
            },
            {
                name: "Sass",
                icon: "/logos/sass.svg",
                link: "https://sass-lang.com/"
            },
            {
                name: "TypeScript",
                icon: "/logos/typescript.svg",
                link: "https://www.typescriptlang.org/"
            },
            {
                name: "JavaScript",
                icon: "/logos/javascript.svg",
                link: "https://www.javascript.com/"
            },
            {
                name: "HTML",
                icon: "/logos/html.svg",
                link: "https://developer.mozilla.org/en-US/docs/Web/HTML"
            },
            {
                name: "CSS",
                icon: "/logos/css.svg",
                link: "https://developer.mozilla.org/en-US/docs/Web/CSS"
            }
        ]
    },
    {
        name: "Backend",
        knowledge: [
            {
                name: "NodeJS",
                icon: "/logos/nodejs.svg",
                link: "https://nodejs.org/en/"
            },
            {
                name: "Express",
                icon: "/logos/express.svg",
                link: "https://expressjs.com/",
                inverted: true
            },
            {
                name: "MongoDB",
                icon: "/logos/mongodb.svg",
                link: "https://www.mongodb.com/"
            },
            {
                name: "MySQL",
                icon: "/logos/mysql.svg",
                link: "https://www.mysql.com/"
            },
            {
                name: "PostgreSQL",
                icon: "/logos/postgresql.svg",
                link: "https://www.postgresql.org/"
            },
            {
                name: "Redis",
                icon: "/logos/redis.svg",
                link: "https://redis.io/"
            },
            {
                name: "GraphQL",
                icon: "/logos/graphql.svg",
                link: "https://graphql.org/"
            }
        ]
    },
    {
        name: "DevOps",
        knowledge: [
            {
                name: "Docker",
                icon: "/logos/docker.svg",
                link: "https://www.docker.com/"
            },
            {
                name: "Kubernetes",
                icon: "/logos/kubernetes.svg",
                link: "https://kubernetes.io/"
            },
            {
                name: "Nginx",
                icon: "/logos/nginx.svg",
                link: "https://www.nginx.com/"
            },
            {
                name: "Cloudflare",
                icon: "/logos/cloudflare.svg",
                link: "https://www.cloudflare.com/"
            },
            {
                name: "Azure",
                icon: "/logos/azure.svg",
                link: "https://azure.microsoft.com/"
            },
            {
                name: "Google Cloud",
                icon: "/logos/google-cloud.svg",
                link: "https://cloud.google.com/"
            },
            {
                name: "CommerceTools",
                icon: "/logos/commercetools.svg",
                link: "https://commercetools.com/"
            },
            {
                name: "Twilio",
                icon: "/logos/twilio.svg",
                link: "https://www.twilio.com/"
            },
            {
                name: "SendGrid",
                icon: "/logos/sendgrid.svg",
                link: "https://sendgrid.com/"
            },
            {
                name: "GitHub",
                icon: "/logos/github.svg",
                link: "https://github.com",
                inverted: true
            },
            {
                name: "Grafana",
                icon: "/logos/grafana.svg",
                link: "https://grafana.com/"
            }
        ]
    }
];
