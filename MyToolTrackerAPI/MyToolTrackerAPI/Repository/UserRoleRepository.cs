﻿using System;
using MyToolTrackerAPI.Data;
using MyToolTrackerAPI.Interfaces;
using MyToolTrackerAPI.Models;

namespace MyToolTrackerAPI.Repository
{
    public class UserRoleRepository : IUserRoleRepository
    {
        private readonly DataContext _context;

        public UserRoleRepository(DataContext context)
        {
            _context = context;
        }

        public UserRole GetUserRole(int id)
        {
            return _context.UserRoles.Where(ur => ur.Id == id)
                .FirstOrDefault();
        }

        public UserRole GetUserRole(string name)
        {
            return _context.UserRoles.Where(ur => ur.Name == name)
                .FirstOrDefault();
        }

        public ICollection<UserRole> GetUserRoles()
        {
            return _context.UserRoles.OrderBy(ur => ur.Id).ToList();
        }

        public bool UserRoleExists(int id)
        {
            return _context.UserRoles.Any(ur => ur.Id == id);
        }
    }
}
