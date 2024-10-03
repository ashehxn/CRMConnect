﻿// <auto-generated />
using System;
using CRMConnect.Server.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Oracle.EntityFrameworkCore.Metadata;

#nullable disable

namespace CRMConnect.Server.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240929164729_init")]
    partial class init
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            OracleModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("CRMConnect.Server.Models.Admin", b =>
                {
                    b.Property<int>("AdminId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("NUMBER(10)");

                    OraclePropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AdminId"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("NVARCHAR2(2000)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("NVARCHAR2(2000)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("NVARCHAR2(2000)");

                    b.HasKey("AdminId");

                    b.ToTable("Admin");
                });

            modelBuilder.Entity("CRMConnect.Server.Models.Customer", b =>
                {
                    b.Property<int>("CustomerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("NUMBER(10)");

                    OraclePropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CustomerId"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("NVARCHAR2(2000)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("NVARCHAR2(2000)");

                    b.Property<int>("Gender")
                        .HasColumnType("NUMBER(10)");

                    b.Property<string>("Industry")
                        .IsRequired()
                        .HasColumnType("NVARCHAR2(2000)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("NVARCHAR2(2000)");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("NVARCHAR2(2000)");

                    b.HasKey("CustomerId");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("CRMConnect.Server.Models.Mail", b =>
                {
                    b.Property<int>("MailId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("NUMBER(10)");

                    OraclePropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MailId"));

                    b.Property<string>("Body")
                        .IsRequired()
                        .HasColumnType("NVARCHAR2(2000)");

                    b.Property<int?>("CustomerId")
                        .HasColumnType("NUMBER(10)");

                    b.Property<int?>("SalesRepId")
                        .HasColumnType("NUMBER(10)");

                    b.Property<int?>("SalesRepresentativeSalesRepId")
                        .HasColumnType("NUMBER(10)");

                    b.Property<DateTime>("SentAt")
                        .HasColumnType("TIMESTAMP(7)");

                    b.Property<string>("Subject")
                        .IsRequired()
                        .HasColumnType("NVARCHAR2(2000)");

                    b.HasKey("MailId");

                    b.HasIndex("CustomerId");

                    b.HasIndex("SalesRepresentativeSalesRepId");

                    b.ToTable("Mails");
                });

            modelBuilder.Entity("CRMConnect.Server.Models.Sale", b =>
                {
                    b.Property<int>("SaleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("NUMBER(10)");

                    OraclePropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("SaleId"));

                    b.Property<int?>("CustomerId")
                        .HasColumnType("NUMBER(10)");

                    b.Property<string>("ProductName")
                        .IsRequired()
                        .HasColumnType("NVARCHAR2(2000)");

                    b.Property<decimal>("SaleAmount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("SaleDate")
                        .HasColumnType("TIMESTAMP(7)");

                    b.Property<int?>("SalesRepId")
                        .HasColumnType("NUMBER(10)");

                    b.Property<int?>("SalesRepresentativeSalesRepId")
                        .HasColumnType("NUMBER(10)");

                    b.HasKey("SaleId");

                    b.HasIndex("CustomerId");

                    b.HasIndex("SalesRepresentativeSalesRepId");

                    b.ToTable("Sales");
                });

            modelBuilder.Entity("CRMConnect.Server.Models.SalesRepresentative", b =>
                {
                    b.Property<int>("SalesRepId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("NUMBER(10)");

                    OraclePropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("SalesRepId"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("NVARCHAR2(2000)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("NVARCHAR2(2000)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("NVARCHAR2(2000)");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("NVARCHAR2(2000)");

                    b.HasKey("SalesRepId");

                    b.ToTable("SalesRepresentatives");
                });

            modelBuilder.Entity("CRMConnect.Server.Models.Task", b =>
                {
                    b.Property<int>("TaskId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("NUMBER(10)");

                    OraclePropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TaskId"));

                    b.Property<DateTime>("DueDate")
                        .HasColumnType("TIMESTAMP(7)");

                    b.Property<int?>("SalesRepId")
                        .HasColumnType("NUMBER(10)");

                    b.Property<int?>("SalesRepresentativeSalesRepId")
                        .HasColumnType("NUMBER(10)");

                    b.Property<int>("Status")
                        .HasColumnType("NUMBER(10)");

                    b.Property<string>("TaskDescription")
                        .IsRequired()
                        .HasColumnType("NVARCHAR2(2000)");

                    b.HasKey("TaskId");

                    b.HasIndex("SalesRepresentativeSalesRepId");

                    b.ToTable("Tasks");
                });

            modelBuilder.Entity("CRMConnect.Server.Models.Mail", b =>
                {
                    b.HasOne("CRMConnect.Server.Models.Customer", "Customer")
                        .WithMany("Mails")
                        .HasForeignKey("CustomerId");

                    b.HasOne("CRMConnect.Server.Models.SalesRepresentative", "SalesRepresentative")
                        .WithMany("Mails")
                        .HasForeignKey("SalesRepresentativeSalesRepId");

                    b.Navigation("Customer");

                    b.Navigation("SalesRepresentative");
                });

            modelBuilder.Entity("CRMConnect.Server.Models.Sale", b =>
                {
                    b.HasOne("CRMConnect.Server.Models.Customer", "Customer")
                        .WithMany("Sales")
                        .HasForeignKey("CustomerId");

                    b.HasOne("CRMConnect.Server.Models.SalesRepresentative", "SalesRepresentative")
                        .WithMany("Sales")
                        .HasForeignKey("SalesRepresentativeSalesRepId");

                    b.Navigation("Customer");

                    b.Navigation("SalesRepresentative");
                });

            modelBuilder.Entity("CRMConnect.Server.Models.Task", b =>
                {
                    b.HasOne("CRMConnect.Server.Models.SalesRepresentative", "SalesRepresentative")
                        .WithMany("Tasks")
                        .HasForeignKey("SalesRepresentativeSalesRepId");

                    b.Navigation("SalesRepresentative");
                });

            modelBuilder.Entity("CRMConnect.Server.Models.Customer", b =>
                {
                    b.Navigation("Mails");

                    b.Navigation("Sales");
                });

            modelBuilder.Entity("CRMConnect.Server.Models.SalesRepresentative", b =>
                {
                    b.Navigation("Mails");

                    b.Navigation("Sales");

                    b.Navigation("Tasks");
                });
#pragma warning restore 612, 618
        }
    }
}
