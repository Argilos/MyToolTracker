﻿using System;
using MyToolTrackerAPI.Data;
using MyToolTrackerAPI.Interfaces;
using MyToolTrackerAPI.Models;

namespace MyToolTrackerAPI.Repository
{
	public class CompanyRepository : ICompanyRepository
	{
		private readonly DataContext _context;

		public CompanyRepository(DataContext context)
		{
			_context = context;
		}

		public bool CompanyExists(int id)
		{
			return _context.Companies.Any(c => c.Id == id);
		}

		public ICollection<Company> GetCompanies()
		{
			return _context.Companies.OrderBy(c => c.Id).ToList();
		}

		public Company GetCompany(int id)
		{
			return _context.Companies.Where(c => c.Id == id).FirstOrDefault();
		}

		public Company GetCompany(string name)
		{
			return _context.Companies.Where(c => c.Name == name).FirstOrDefault();
		}
	}
}

