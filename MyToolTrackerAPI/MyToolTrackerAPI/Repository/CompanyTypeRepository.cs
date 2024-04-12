﻿using System;
using MyToolTrackerAPI.Data;
using MyToolTrackerAPI.Interfaces;
using MyToolTrackerAPI.Models;

namespace MyToolTrackerAPI.Repository
{
    public class CompanyTypeRepository : ICompanyTypeRepository
	{
        private readonly DataContext _context;

		public CompanyTypeRepository(DataContext context)
		{
            _context = context;
		}

        public bool CompanyTypeExists(int id)
        {
            return _context.CompanyTypes.Any(ct => ct.Id == id);
        }

        public CompanyType GetCompanyType(int id)
        {
            return _context.CompanyTypes.Where(ct => ct.Id == id)
                .FirstOrDefault();
        }

        public CompanyType GetCompanyType(string name)
        {
            return _context.CompanyTypes.Where(ct => ct.Name == name)
                .FirstOrDefault();
        }

        public ICollection<CompanyType> GetCompanyTypes()
        {
            return _context.CompanyTypes.OrderBy(ct => ct.Id).ToList();
        }
    }
}

