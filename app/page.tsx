import { ProjectInterface } from "@/common-types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjectCard"
import { fetchAllProjects } from "@/lib/actions";
import React from 'react'

type ProjectsSearch= {
  projectSearch:{
    edges:{ node: ProjectInterface}[];
    pageInfo: {
      hasPreviousPage:boolean;
      hasNextPage:boolean;
      startCursor:string;
      endCursor:string;
    }
  }
  

}


const Home = async() => {
  const data = await fetchAllProjects() as ProjectsSearch;
  const projectsToDisplay = data?.projectSearch?.edges || [];
  if (projectsToDisplay.length === 0 ) {
    return(
      <section className ="flexStart flex-col paddings ">
       <Categories/>
      <p className ="no-result-text text-center"> No projects found, go create some first.</p>
      </section>
    )
  }

return (
  <section className =" flexStart flex-col bg-clip-paddings mb-16">
    <Categories/>

    <section className="projects-grid">
    {projectsToDisplay.map(({node} : {node: ProjectInterface}) => (
      <ProjectCard
      key={node?.id}
      id={node?.id}
      image={node?.title}
      name={node?.createBy?.name}
      avatarUrl={node?.createBy?.id}
      />
      ))}
        </section>

    
<LoadMore
/>
</section>
)
}


export default Home