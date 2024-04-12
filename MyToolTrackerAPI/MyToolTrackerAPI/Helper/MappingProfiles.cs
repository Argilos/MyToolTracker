﻿using System;
using AutoMapper;
using MyToolTrackerAPI.Dto;
using MyToolTrackerAPI.Models;

namespace MyToolTrackerAPI.Helper
{
	public class MappingProfiles : Profile
	{
		public MappingProfiles()
		{
			CreateMap<Category, CategoryDto>();
			CreateMap<Company, CompanyDto>();
			CreateMap<CompanyType, CompanyTypeDto>();
			CreateMap<Employee, EmployeeDto>();
			CreateMap<EmployeeType, EmployeeTypeDto>();
			CreateMap<Project, ProjectDto>();
			CreateMap<Tool, ToolDto>();
		}
	}
}

